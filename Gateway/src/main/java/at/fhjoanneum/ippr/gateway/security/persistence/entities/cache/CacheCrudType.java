package at.fhjoanneum.ippr.gateway.security.persistence.entities.cache;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.CrudType;

public class CacheCrudType {

    private final String systemId;

    public CacheCrudType(final String systemId) {
        this.systemId = systemId;
    }

    public String getSystemId() {
        return systemId;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof CacheCrudType) {
            return ((CacheCrudType) obj).getSystemId().equals(this.systemId);
        }
        return false;
    }

    public static CacheCrudType fromCrudType(CrudType r) {
        return new CacheCrudType(r.getSystemId());
    }
}
