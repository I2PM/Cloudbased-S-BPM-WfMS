package at.fhjoanneum.ippr.gateway.security.persistence.objects;

import at.fhjoanneum.ippr.gateway.security.persistence.entities.OrganizationImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.RoleImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.RuleImpl;

import java.util.List;

public interface Role {

    Long getRoleId();

    void setRoleId(final Long roleId);

    String getSystemId();

    void setSystemId(final String systemId);

    String getName();

    void setName(String name);

    OrganizationImpl getOrganization();

    void setOrganization(OrganizationImpl organization);

    boolean getSubjectRole();

    void setSubjectRole(boolean subjectRole);

    List<Rule> getRules();

    void setRules(List<Rule> rules);

    RoleImpl getParent();

    //Long getOrgId();

    void setParent(Role parent);
}
