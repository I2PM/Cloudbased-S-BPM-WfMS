package at.fhjoanneum.ippr.gateway.security.persistence.entities;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

import java.util.List;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.Organization;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;
import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Lists;

import at.fhjoanneum.ippr.gateway.security.persistence.Builder;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Role;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Resource;

public class RoleBuilder implements Builder<Role> {

    private String systemId;
    private String name;
    private Long organization_o_id;
    private RoleImpl parent;
    private Boolean subjectRole;
    private final List<RuleImpl> rules = Lists.newArrayList();

    public RoleBuilder systemId(final String systemId) {
        checkArgument(StringUtils.isNotBlank(systemId));
        this.systemId = systemId;
        return this;
    }

    public RoleBuilder name(final String name) {
        checkArgument(StringUtils.isNotBlank(name));
        this.name = name;
        return this;
    }


    public RoleBuilder addRule(final Rule rule) {
        checkNotNull(rule);
        checkArgument(rule instanceof RuleImpl);
        rules.add((RuleImpl) rule);
        return this;
    }

    public RoleBuilder parent(final Role parent) {
        checkArgument(parent instanceof RoleImpl || parent == null);
        this.parent = (RoleImpl)parent;
        return this;
    }

    public RoleBuilder subjectRole(final boolean subjectRole) {
       this.subjectRole = subjectRole;
        return this;
    }

    /*
    public RoleBuilder organization(final Organization organization) {
        checkArgument(organization instanceof OrganizationImpl || organization == null);
        this.organization = (OrganizationImpl) organization;
        return this;
    }*/

    @Override

    public Role build() {
        checkArgument(StringUtils.isNotBlank(systemId));
        checkArgument(StringUtils.isNotBlank(name));
        return new RoleImpl(name, systemId, rules, organization_o_id, subjectRole, parent);
    }
}
