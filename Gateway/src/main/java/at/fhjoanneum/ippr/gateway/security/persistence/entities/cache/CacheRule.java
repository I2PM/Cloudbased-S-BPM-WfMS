package at.fhjoanneum.ippr.gateway.security.persistence.entities.cache;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;

public class CacheRule {

    private final String scope;
    private final String type;
    private final String systemId;

    public CacheRule(final String systemId, final String type, final String scope) {
        this.type = type;
        this.scope = scope;
        this.systemId = systemId;
    }

    public String getScope() {
        return scope;
    }

    public String getType() {
        return type;
    }

    public String getSystemId() {
        return systemId;
    }

    public boolean equalsRule(Rule rule) {
        return rule.getType().equals(type) && rule.getScope().equals(scope);
    }
}
