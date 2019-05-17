package at.fhjoanneum.ippr.gateway.security.persistence.entities.cache;

import static com.google.common.base.Preconditions.checkArgument;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

public class CacheRole {

    private final String systemId;
    private final String name;
    private final List<CacheRule> rules;
    private final boolean subjectRole;
    private final CacheOrganization organization;
    private final CacheRole parent;


    public CacheRole(String systemId, String name, List<CacheRule> rules, boolean subjectRole, CacheOrganization organization, CacheRole parent) {
        checkArgument(StringUtils.isNotBlank(systemId));
        checkArgument(StringUtils.isNotBlank(name));
        checkArgument(rules != null);
        this.systemId = systemId;
        this.name = name;
        this.rules = rules;
        this.subjectRole = subjectRole;
        this.organization = organization;
        this.parent = parent;
    }

    public String getSystemId() {
        return systemId;
    }

    public String getName() {
        return name;
    }

    public List<CacheRule> getRules() {
        return rules;
    }

    public boolean isSubjectRole() {
        return subjectRole;
    }

    public CacheOrganization getOrganization() {
        return organization;
    }

    public CacheRole getParent() {
        return parent;
    }

    @Override
    public boolean equals(final Object obj) {
        if (obj == null) {
            return false;
        }
        if (!CacheRole.class.isAssignableFrom(obj.getClass())) {
            return false;
        }
        final CacheRole other = (CacheRole) obj;
        if ((this.systemId == null) ? (other.getSystemId() != null)
                : !this.systemId.equals(other.getSystemId())) {
            return false;
        }
        return true;
    }
}
