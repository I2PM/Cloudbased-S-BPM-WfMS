package at.fhjoanneum.ippr.gateway.security.persistence.objects;

public interface Rule {

    Long getRuleId();

    String getSystemId();

    void setSystemId(String systemId);

    String getType();

    void setType(String type);

    String getScope();

    void setScope(String scope);
}
