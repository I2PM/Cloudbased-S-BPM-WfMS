package at.fhjoanneum.ippr.commons.dto.processstore;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@XmlRootElement
public class ProcessStoreDTO implements Serializable {

    //private static final long serialVersionUID = 2075853829794256949L;

    private Long processId;

    private String processName;

    public ProcessStoreDTO() {}

    public ProcessStoreDTO(final Long processId, final String processName) {
        this.processName = processName;
        this.processId = processId;
    }

    public Long getProcessId() { return processId; }

    public String getProcessName() { return processName; }


}
