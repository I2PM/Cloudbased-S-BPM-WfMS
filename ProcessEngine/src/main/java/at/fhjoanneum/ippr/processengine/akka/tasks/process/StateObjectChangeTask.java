package at.fhjoanneum.ippr.processengine.akka.tasks.process;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronizationAdapter;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import akka.actor.ActorRef;
import akka.pattern.Patterns;
import at.fhjoanneum.ippr.commons.dto.processengine.stateobject.BusinessObjectInstanceDTO;
import at.fhjoanneum.ippr.persistence.entities.engine.businessobject.BusinessObjectInstanceBuilder;
import at.fhjoanneum.ippr.persistence.entities.engine.businessobject.BusinessObjectInstanceImpl;
import at.fhjoanneum.ippr.persistence.entities.engine.businessobject.field.BusinessObjectFieldInstanceBuilder;
import at.fhjoanneum.ippr.persistence.entities.engine.businessobject.field.BusinessObjectFieldInstanceImpl;
import at.fhjoanneum.ippr.persistence.entities.engine.state.SubjectStateImpl;
import at.fhjoanneum.ippr.persistence.objects.engine.businessobject.BusinessObjectFieldInstance;
import at.fhjoanneum.ippr.persistence.objects.engine.businessobject.BusinessObjectInstance;
import at.fhjoanneum.ippr.persistence.objects.engine.process.ProcessInstance;
import at.fhjoanneum.ippr.persistence.objects.engine.state.SubjectState;
import at.fhjoanneum.ippr.persistence.objects.model.businessobject.BusinessObjectModel;
import at.fhjoanneum.ippr.persistence.objects.model.businessobject.permission.BusinessObjectFieldPermission;
import at.fhjoanneum.ippr.persistence.objects.model.enums.FieldPermission;
import at.fhjoanneum.ippr.persistence.objects.model.enums.FieldType;
import at.fhjoanneum.ippr.persistence.objects.model.state.State;
import at.fhjoanneum.ippr.processengine.akka.config.Global;
import at.fhjoanneum.ippr.processengine.akka.config.SpringExtension;
import at.fhjoanneum.ippr.processengine.akka.messages.EmptyMessage;
import at.fhjoanneum.ippr.processengine.akka.messages.process.workflow.StateObjectChangeMessage;
import at.fhjoanneum.ippr.processengine.akka.tasks.AbstractTask;
import at.fhjoanneum.ippr.processengine.parser.DbValueParser;
import at.fhjoanneum.ippr.processengine.repositories.BusinessObjectFieldInstanceRepository;
import at.fhjoanneum.ippr.processengine.repositories.BusinessObjectFieldPermissionRepository;
import at.fhjoanneum.ippr.processengine.repositories.BusinessObjectInstanceRepository;
import at.fhjoanneum.ippr.processengine.repositories.ProcessInstanceRepository;
import at.fhjoanneum.ippr.processengine.repositories.StateRepository;
import at.fhjoanneum.ippr.processengine.repositories.SubjectStateRepository;
import scala.concurrent.Await;
import scala.concurrent.Future;

@Component("StateObjectChangeTask")
@Scope("prototype")
public class StateObjectChangeTask extends AbstractTask {

  private final static Logger LOG = LoggerFactory.getLogger(StateObjectChangeTask.class);

  @Autowired
  private SpringExtension springExtension;

  @Autowired
  private ProcessInstanceRepository processInstanceRepository;
  @Autowired
  private SubjectStateRepository subjectStateRepository;
  @Autowired
  private BusinessObjectInstanceRepository businessObjectInstanceRepository;
  @Autowired
  private BusinessObjectFieldInstanceRepository businessObjectFieldInstanceRepository;
  @Autowired
  private BusinessObjectFieldPermissionRepository businessObjectFieldPermissionRepository;
  @Autowired
  private StateRepository stateRepository;
  @Autowired
  private DbValueParser valueParser;


  @Override
  public boolean canHandle(final Object obj) {
    return obj instanceof StateObjectChangeMessage.Request;
  }

  @Override
  public void execute(final Object obj) throws Exception {
    handleStateObjectChangeMessage(obj);
  }

  private void handleStateObjectChangeMessage(final Object obj) throws Exception {
    final StateObjectChangeMessage.Request request = (StateObjectChangeMessage.Request) obj;

    final SubjectState subjectState =
        Optional
            .ofNullable(subjectStateRepository
                .getSubjectStateOfUserInProcessInstance(request.getPiId(), request.getUserId()))
            .get();

    final ActorRef sender = getSender();

    final ActorRef bussinessObjectCheckActor = getContext().actorOf(
        springExtension.props("BusinessObjectCheckActor", subjectState.getCurrentState().getSId()),
        UUID.randomUUID().toString());

    // must block thread since transaction get lost when using completable future
    final Future<Object> future = Patterns.ask(bussinessObjectCheckActor, request, Global.TIMEOUT);
    final boolean correct =
        ((Boolean) Await.result(future, Global.TIMEOUT.duration())).booleanValue();

    if (!correct) {
      sender.tell(new akka.actor.Status.Failure(
          new IllegalArgumentException("Check of business objects returned false")), getSelf());
    } else {
      initBusinessObjectInstances(subjectState, request);
      setValuesOfBusinessObjectFieldInstances(subjectState.getCurrentState(), request);
      changeToNextState(subjectState, request);

      TransactionSynchronizationManager
          .registerSynchronization(new TransactionSynchronizationAdapter() {
            @Override
            public void afterCommit() {
              sender.tell(new EmptyMessage(), getSelf());
            }
          });
    }
  }

  private void initBusinessObjectInstances(final SubjectState state,
      final StateObjectChangeMessage.Request request) {
    final ProcessInstance processInstance = processInstanceRepository.findOne(request.getPiId());

    final List<BusinessObjectModel> toCreate = state.getCurrentState().getBusinessObjectModels()
        .stream().filter(model -> !processInstance.isBusinessObjectInstanceOfModelCreated(model))
        .collect(Collectors.toList());

    LOG.debug("Must create instances for business object models: {}", toCreate);
    toCreate.forEach(model -> createBusinessObjectInstanceOfModel(processInstance, model));
  }

  private void createBusinessObjectInstanceOfModel(final ProcessInstance processInstance,
      final BusinessObjectModel businessObjectModel) {
    final BusinessObjectInstance businessObjectInstance = new BusinessObjectInstanceBuilder()
        .processInstance(processInstance).businessObjectModel(businessObjectModel).build();

    final List<BusinessObjectFieldInstanceImpl> fields =
        businessObjectModel.getBusinessObjectFieldModels().stream()
            .map(fieldModel -> new BusinessObjectFieldInstanceBuilder()
                .businessObjectInstance(businessObjectInstance).businessObjectFieldModel(fieldModel)
                .build())
            .map(field -> (BusinessObjectFieldInstanceImpl) field).collect(Collectors.toList());

    businessObjectInstanceRepository.save((BusinessObjectInstanceImpl) businessObjectInstance);
    businessObjectFieldInstanceRepository.save(fields);
    LOG.info("Created new business object instance: {}", businessObjectInstance);
  }

  private void setValuesOfBusinessObjectFieldInstances(final State currentState,
      final StateObjectChangeMessage.Request request) {
    final ActorRef sender = getSender();

    request.getStateObjectChangeDTO().getBusinessObjects().stream()
        .map(BusinessObjectInstanceDTO::getFields).flatMap(List::stream).forEach(field -> {
          final Optional<BusinessObjectFieldPermission> permissionOpt = Optional.ofNullable(
              businessObjectFieldPermissionRepository.getBusinessObjectFieldPermissionInState(
                  field.getBofmId(), currentState.getSId()));

          if (permissionOpt.isPresent()) {
            final BusinessObjectFieldPermission permission = permissionOpt.get();

            if (permission.getPermission().equals(FieldPermission.READ_WRITE)
                && StringUtils.isNotBlank(field.getValue())) {
              final Optional<BusinessObjectFieldInstance> fieldInstanceOpt =
                  Optional.ofNullable(businessObjectFieldInstanceRepository
                      .getBusinessObjectFieldInstanceForModelInProcess(request.getPiId(),
                          field.getBofmId()));
              if (!fieldInstanceOpt.isPresent()) {
                sender.tell(
                    new akka.actor.Status.Failure(new IllegalStateException(
                        "Could not find field instance for BOFM_ID [" + field.getBofmId() + "]")),
                    getSelf());
              } else {
                // parse the value
                final BusinessObjectFieldInstance fieldInstance = fieldInstanceOpt.get();
                final FieldType fieldType =
                    fieldInstance.getBusinessObjectFieldModel().getFieldType();
                final String value = valueParser.parse(field.getValue(), fieldType);
                LOG.debug("Parsed value is: {}", value);
                fieldInstance.setValue(value);
                businessObjectFieldInstanceRepository
                    .save((BusinessObjectFieldInstanceImpl) fieldInstance);
                LOG.info("Updated the value of field instance: {} to {}", fieldInstance, value);
              }
            }
          }
        });
  }

  private void changeToNextState(final SubjectState subjectState,
      final StateObjectChangeMessage.Request request) {
    final Long nextStateId = request.getStateObjectChangeDTO().getNextStateId();
    final State nextState = stateRepository.findOne(nextStateId);
    subjectState.setCurrentState(nextState);
    subjectStateRepository.save((SubjectStateImpl) subjectState);
    LOG.info("Changed subject S_ID [{}] to state: {}", subjectState.getSubject().getSId(),
        nextState);
  }
}