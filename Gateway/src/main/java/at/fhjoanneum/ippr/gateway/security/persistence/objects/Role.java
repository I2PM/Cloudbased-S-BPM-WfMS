package at.fhjoanneum.ippr.gateway.security.persistence.objects;

import at.fhjoanneum.ippr.gateway.security.persistence.entities.OrganizationImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.ResourceImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.RoleImpl;

import java.util.List;

public interface Role {

    Long getRoleId();

    String getSystemId();

    String getName();

    void setName(String name);

    OrganizationImpl getOrganization();

    void setOrganization(OrganizationImpl organization);

    boolean getSubjectRole();

    void setSubjectRole(boolean subjectRole);

    List<Rule> getRules();

    void setRules(List<Rule> rules);

    RoleImpl getParent();

    void setParent(Role parent);
}
