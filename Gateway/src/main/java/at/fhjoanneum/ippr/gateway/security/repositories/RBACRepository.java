package at.fhjoanneum.ippr.gateway.security.repositories;

import java.util.List;
import java.util.Optional;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.*;

public interface RBACRepository {

  User saveUser(final User user);

  Role saveRole(final Role group);

  String editRole(final Long roleId, final String newName, final Boolean newSubjectRole, final Long newParentId);

  String deleteAllRolesFromRoleToRuleMap(final Long roleId);

  String mapRoleToRule(final Long roleId, final Long ruleId);

  Resource saveResource(final Resource resource);

  Role addRoleToUser(final Long userId, final Long roleId);

  String deleteRole(final Long roleId);

  Rule saveRule(final Rule rule);

  CrudType saveCrudType(final CrudType crudType);

  Optional<User> getUserByUserId(final Long userId);

  Optional<User> getUserBySystemId(final String systemId);

  Optional<User> getUserByUsername(final String username);

  Optional<User> getUserByEmail(final String email);

  Optional<Rule> getRuleBySystemId(final String systemId);

  Optional<Role> getRoleBySystemId(final String systemId);

  Optional<Role> getRoleByRoleName(final String roleName);

  Optional<Role> getRoleById(final Long roleId);

  List<User> getUsersByRoleName(final String roleName);

  List<User> getUsersByRuleNames(final List<String> ruleNames);

  List<Rule> getRules();

  List<Role> getRoles();

  Optional<CrudType> getCrudTypeBySystemId(final String systemId);

  Optional<Resource> getRescourceBySystemId(final String systemId);

  List<Role> getRolesOfOrganization(final Long oId);

  List<Role> getPublicAndOwnRoles(final Long oId);
}
