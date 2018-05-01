package at.fhjoanneum.ippr.processstore.services;

import at.fhjoanneum.ippr.commons.dto.processstore.ProcessStoreDTO;
import at.fhjoanneum.ippr.processstore.persistence.entities.ProcessStoreObjectImpl;
import at.fhjoanneum.ippr.processstore.repositories.ProcessStore;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Future;

@Transactional
@Service
public class ProcessStoreServiceImpl implements ProcessStoreService {

    private static final Logger LOG = LoggerFactory.getLogger(ProcessStoreServiceImpl.class);

    @Autowired
    private ProcessStore processStore;

    @Override
    @Async
    public Future<List<ProcessStoreDTO>> findAllProcesses() {
        final List<ProcessStoreObjectImpl> results = processStore.findAllProcesses();

        final List<ProcessStoreDTO> processes = createProcessStoreDTO(results);

        return new AsyncResult<List<ProcessStoreDTO>>(processes);
    }

    @Override
    public Optional<ProcessStoreDTO> saveProcessStoreObject(String processName) {
        return Optional.empty();
    }

    private static List<ProcessStoreDTO> createProcessStoreDTO(final List<ProcessStoreObjectImpl> results) {
        final List<ProcessStoreDTO> processes = Lists.newArrayList();

        for(ProcessStoreObjectImpl processStoreObject : results) {
            final ProcessStoreDTO dto = new ProcessStoreDTO(processStoreObject.getStoreId(), processStoreObject.getProcessName());
            processes.add(dto);
        }
        return processes;
    }
}
