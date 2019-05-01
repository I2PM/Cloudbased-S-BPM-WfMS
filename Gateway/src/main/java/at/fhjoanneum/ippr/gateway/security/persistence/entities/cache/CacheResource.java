package at.fhjoanneum.ippr.gateway.security.persistence.entities.cache;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.Resource;

public class CacheResource {

    private final String systemId;

    public CacheResource(final String systemId) {
        this.systemId = systemId;
    }

    public String getSystemId() {
        return systemId;
    }

    @Override
    public boolean equals(Object obj) {
        if(obj instanceof CacheResource){
            return ((CacheResource) obj).getSystemId().equals(this.systemId);
        }
        return false;
    }

    public static CacheResource fromResource(Resource r) {
        return new CacheResource(r.getSystemId());
    }
}
