package at.fhjoanneum.ippr.gateway.security.persistence.objects;

public interface CrudType {
    Long getCrudTypeId();

    String getSystemId();

    void setSystemId(String systemId);
}
