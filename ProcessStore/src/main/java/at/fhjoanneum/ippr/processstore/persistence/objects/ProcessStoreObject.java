package at.fhjoanneum.ippr.processstore.persistence.objects;

public interface ProcessStoreObject {

    Long getStoreId();

    String getProcessName();

    void setProcessName(String processName);

    Boolean isApproved();

    String getProcessApprover();

    void setProcessApprover(String processApprover);

    Long getProcessVersion();

    void setProcessVersion(Long processVersion);

}
