package at.fhjoanneum.ippr.processstore.persistence.entities;


import at.fhjoanneum.ippr.processstore.persistence.objects.ProcessStoreObject;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

@Entity(name="PROCESSSTORE")
@XmlRootElement
public class ProcessStoreObjectImpl implements ProcessStoreObject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long processId;

    @Column
    @NotBlank
    private String processName;

    public ProcessStoreObjectImpl() {}

    public ProcessStoreObjectImpl(String processName) {
        this.processName = processName;
    }

    @Override
    public Long getStoreId() {
        return processId;
    }

    @Override
    public String getProcessName() {
        return processName;
    }

    @Override
    public void setProcessName(String processName) {
        this.processName = processName;
    }

}
