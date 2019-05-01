package at.fhjoanneum.ippr.gateway.security.persistence.objects;

public interface Resource {

    Long getResourceId();

    String getSystemId();

    void setSystemId(String systemId);
}
