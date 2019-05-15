package at.fhjoanneum.ippr.gateway.security.persistence.objects;

import at.fhjoanneum.ippr.gateway.security.persistence.entities.CrudTypeImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.ResourceImpl;

public interface Rule {
    Long getRuleId();

    String getSystemId();

    void setSystemId(String systemId);

    void setResource(ResourceImpl resource);

    Resource getResource();

    CrudType getCrudType();

    void setCrudType(CrudTypeImpl crudType);
}
