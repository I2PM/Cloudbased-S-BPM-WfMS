package at.fhjoanneum.ippr.commons.dto.processstore;

public class ProcessOrgaMappingDTO {

    private String orgaId;
    private String userId;
    private String processStoreId;
    private String processModelId;

    public ProcessOrgaMappingDTO() {
    }

    public ProcessOrgaMappingDTO(String orgaId, String userId, String processId) {
        this.orgaId = orgaId;
        this.userId = userId;
        this.processStoreId = processId;
    }

    public String getOrgaId() {
        return orgaId;
    }

    public void setOrgaId(String orgaId) {
        this.orgaId = orgaId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getProcessId() {
        return processStoreId;
    }

    public void setProcessId(String processId) {
        this.processStoreId = processId;
    }

    public void SetProcessModelId(String processModelId) {this.processModelId=processModelId;}
}
