package at.fhjoanneum.ippr.gateway.security.persistence.objects;

import at.fhjoanneum.ippr.gateway.security.persistence.entities.ResourceImpl;

import java.util.List;

public interface Role {

    Long getRoleId();

    String getSystemId();

    String getName();

    void setName(String name);

    List<Rule> getRules();

    void setRules (List<Rule> rules);
}
