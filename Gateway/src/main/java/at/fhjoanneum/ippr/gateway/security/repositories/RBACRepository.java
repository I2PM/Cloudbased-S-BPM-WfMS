package at.fhjoanneum.ippr.gateway.security.repositories;

import java.util.List;
import java.util.Optional;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.*;

public interface RBACRepository {

  User saveUser(final User user);

  Role saveRole(final Role group);

  Resource saveResource(final Resource resource);

  Rule saveRule(final Rule rule);

  CrudType saveCrudType(final CrudType crudType);

  Optional<User> getUserByUserId(final Long userId);

  Optional<User> getUserBySystemId(final String systemId);

  Optional<User> getUserByUsername(final String username);

  Optional<User> getUserByEmail(final String email);

  Optional<Rule> getRuleBySystemId(final String systemId);

  Optional<Role> getRoleBySystemId(final String systemId);

  Optional<Role> getRoleByRoleName(final String roleName);

  List<User> getUsersByRoleName(final String roleName);

  List<User> getUsersByRuleNames(final List<String> ruleNames);

  List<Resource> getRules();

  List<Role> getRoles();

  Optional<CrudType> getCrudTypeBySystemId(final String systemId);

  Optional<Resource> getRescourceBySystemId(final String systemId);

  List<Role> getRolesOfOrganization(final Long oId);
}
