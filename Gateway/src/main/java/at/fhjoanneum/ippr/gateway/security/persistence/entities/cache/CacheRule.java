package at.fhjoanneum.ippr.gateway.security.persistence.entities.cache;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;

public class CacheRule {
    private final String systemId;
    private final CacheResource resource;
    private final CacheCrudType crudType;

    public CacheRule(String systemId, CacheResource resource, CacheCrudType crudType) {
        this.systemId = systemId;
        this.resource = resource;
        this.crudType = crudType;
    }

    public String getSystemId() {
        return systemId;
    }

    public CacheResource getResource() {
        return resource;
    }

    public CacheCrudType getCrudType() {
        return crudType;
    }

    public static CacheRule fromRule(Rule r) {
        return new CacheRule(r.getSystemId(), CacheResource.fromResource(r.getResource()), CacheCrudType.fromCrudType(r.getCrudType()));
    }
}
