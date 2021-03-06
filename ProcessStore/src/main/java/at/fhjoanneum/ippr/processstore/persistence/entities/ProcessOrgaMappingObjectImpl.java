package at.fhjoanneum.ippr.processstore.persistence.entities;

import at.fhjoanneum.ippr.commons.dto.processstore.ProcessStoreDTO;
import at.fhjoanneum.ippr.processstore.persistence.objects.ProcessOrgaMappingObject;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;


@Entity(name="PROCESSORGAMAPPING")
@XmlRootElement
public class ProcessOrgaMappingObjectImpl implements ProcessOrgaMappingObject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @Column
    private String orgaId;

    @Column
    private String userId;

    @Column
    private String processStoreId;

    @Column
    private String processModelId;


    public ProcessOrgaMappingObjectImpl(String orgaId, String userId, String processStoreId) {

        this.orgaId = orgaId;
        this.userId = userId;
        this.processStoreId = processStoreId;
    }
}
