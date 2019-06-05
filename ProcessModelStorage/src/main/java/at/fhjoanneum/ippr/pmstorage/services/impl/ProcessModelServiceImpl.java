package at.fhjoanneum.ippr.pmstorage.services.impl;


import at.fhjoanneum.ippr.commons.dto.payasyougo.PayAsYouGoDTO;
import at.fhjoanneum.ippr.commons.dto.pmstorage.FieldPermissionDTO;
import at.fhjoanneum.ippr.commons.dto.pmstorage.FieldTypeDTO;
import at.fhjoanneum.ippr.commons.dto.pmstorage.ProcessModelDTO;
import at.fhjoanneum.ippr.commons.dto.pmstorage.SubjectModelDTO;
import at.fhjoanneum.ippr.persistence.entities.model.payasyougo.PayAsYouGoImpl;
import at.fhjoanneum.ippr.persistence.entities.model.process.ProcessModelImpl;
import at.fhjoanneum.ippr.persistence.objects.model.enums.FieldPermission;
import at.fhjoanneum.ippr.persistence.objects.model.enums.FieldType;
import at.fhjoanneum.ippr.persistence.objects.model.enums.ProcessModelState;
import at.fhjoanneum.ippr.persistence.objects.model.process.ProcessModel;
import at.fhjoanneum.ippr.persistence.objects.model.subject.SubjectModel;
import at.fhjoanneum.ippr.pmstorage.repositories.PayAsYouGoRepository;
import at.fhjoanneum.ippr.pmstorage.repositories.ProcessModelRepository;
import at.fhjoanneum.ippr.pmstorage.services.ProcessModelService;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Future;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.Instant;
import java.lang.Float;


@Transactional(isolation = Isolation.READ_COMMITTED)
@Service
public class ProcessModelServiceImpl implements ProcessModelService {

  private static final Logger LOG = LoggerFactory.getLogger(ProcessModelServiceImpl.class);

  @Autowired
  private ProcessModelRepository processModelRepository;

  @Autowired
  private PayAsYouGoRepository payAsYouGoRepository;

  @Override
  @Async
  public Future<List<ProcessModelDTO>> findActiveProcessModels(final Pageable pageable) {
    final List<ProcessModelImpl> results = processModelRepository.findActiveProcesses();
    final List<ProcessModelDTO> processModels = createProcessModelDTO(results);
    return new AsyncResult<List<ProcessModelDTO>>(processModels);
  }

  @Override
  @Async
  public Future<List<ProcessModelDTO>> findActiveProcessModelsToStart(final List<String> rules, final Pageable pageable) {
    final List<ProcessModelImpl> results = processModelRepository.findActiveProcessesToStart(rules);
    final List<ProcessModelDTO> processModels = createProcessModelDTO(results);
    return new AsyncResult<List<ProcessModelDTO>>(processModels);
  }

  private static List<ProcessModelDTO> createProcessModelDTO(final List<ProcessModelImpl> results) {
    final List<ProcessModelDTO> processModels = Lists.newArrayList();
    List<SubjectModelDTO> subjectModels;
    SubjectModelDTO starterSubject;

    for(ProcessModelImpl process : results ){
      subjectModels = Lists.newArrayList();
      for(SubjectModel subject : process.getSubjectModels()) {
                subjectModels.add(
                        new SubjectModelDTO(subject.getSmId(), subject.getName(), subject.getAssignedRoles()));
      }
      starterSubject = new SubjectModelDTO(process.getStarterSubjectModel().getSmId(),process.getStarterSubjectModel().getName(),
              process.getStarterSubjectModel().getAssignedRoles());
      final ProcessModelDTO dto =
              new ProcessModelDTO(process.getPmId(), process.getName(), process.getDescription(),
                      process.createdAt(), subjectModels, process.getState().name(), process.getVersion(),
                      starterSubject);
					  
      processModels.add(dto);
    }

    return processModels;
  }

  @Async
  @Override
  public Future<List<FieldTypeDTO>> getFieldTypes() {
    final List<FieldTypeDTO> fieldTypes = Arrays.stream(FieldType.values())
        .map(fieldtype -> new FieldTypeDTO(fieldtype.name())).collect(Collectors.toList());
    return new AsyncResult<List<FieldTypeDTO>>(fieldTypes);
  }

  @Async
  @Override
  public Future<List<FieldPermissionDTO>> getPermissions() {
    final List<FieldPermissionDTO> permissions = Arrays.stream(FieldPermission.values())
        .map(permission -> new FieldPermissionDTO(permission.name())).collect(Collectors.toList());
    return new AsyncResult<List<FieldPermissionDTO>>(permissions);
  }

  @Async
  @Override
  public void disableProcessModel(final Long pmId) {
    final Optional<ProcessModel> processModel =
        Optional.ofNullable(processModelRepository.findOne(pmId));
    if (processModel.isPresent()) {
      processModel.get().setState(ProcessModelState.INACTIVE);
      LOG.info("Disabled [{}]", processModel.get());
    }
  }

  @Async
  @Override
  public Future<List<ProcessModelDTO>> findAllProcessModels() {
    final List<ProcessModelImpl> results = processModelRepository.findAllOrderedByName();
    final List<ProcessModelDTO> processModels = createProcessModelDTO(results);
    return new AsyncResult<List<ProcessModelDTO>>(processModels);
  }

  @Override
  @Async
  public Future<Iterable<PayAsYouGoDTO>> findPayAsYouGoByOrgId(int org_id) {
    final Iterable<PayAsYouGoImpl> results = payAsYouGoRepository.findPayAsYouGoByOrgId(org_id);
    final List<PayAsYouGoDTO> paygList = createPayAsYouGoDTO(results);

    return new AsyncResult<>(paygList);
  }

  @Async
  @Override
  public void addPayAsYouGoEntry(final Long processInstanceId, final String processName,final Long oId,final Long startTime,final Long rate) {

    //LocalDate startDate = parser.parse(startTime);
    LocalDateTime startDateTime= Instant.ofEpochMilli(startTime).atZone(ZoneId.systemDefault())
            .toLocalDateTime();

    LOG.info("startDate: "+startDateTime);

    //String rate2 = rate.replace("$",".");
    Float rateFloat = rate/10000f;
    LOG.info("rateFloat: "+rateFloat);

    int processInstanceIdInt = processInstanceId.intValue();

    PayAsYouGoImpl paygEntry = new PayAsYouGoImpl(processInstanceId.intValue(), processName, oId.intValue(), startDateTime, rateFloat);
    payAsYouGoRepository.save(paygEntry);


    //payAsYouGoRepository.insertNewPayAsYouGoEntry(processInstanceId, processName, oId, startDateTime, rate);
  }

  @Async
  @Override
  public void updatePayAsYouGoEntry(final Long processInstanceId, final Long endTime) {

    //LocalDate startDate = parser.parse(startTime);
    LocalDateTime endDateTime= Instant.ofEpochMilli(endTime).atZone(ZoneId.systemDefault())
            .toLocalDateTime();

    LOG.info("endDateTime: "+endDateTime);

    payAsYouGoRepository.updatePayAsYouGoByPiId(endDateTime,processInstanceId);
  }

  private static List<PayAsYouGoDTO> createPayAsYouGoDTO(final Iterable<PayAsYouGoImpl> results) {
    final List<PayAsYouGoDTO> paygList = Lists.newArrayList();
    for(PayAsYouGoImpl PAYGentry : results) {
      final PayAsYouGoDTO dto = new PayAsYouGoDTO(
              PAYGentry.getEntryId(), PAYGentry.getPiId(), PAYGentry.getProcessName(), PAYGentry.getOrgId(),
              PAYGentry.getDateTimeStart(), PAYGentry.getDateTimeEnd(), PAYGentry.getDuration(),
              PAYGentry.getRate(), PAYGentry.getTotalCost());
      paygList.add(dto);
    }
    return paygList;
  }

}
