package at.fhjoanneum.ippr.gateway.security.services;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import at.fhjoanneum.ippr.commons.dto.user.UserDTO;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.OrganizationImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Role;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.User;


public interface RBACService {

  public User getUserByUserId(Long uId);

  public Future<List<UserDTO>> getUsersByOrgId(final Long orgId);

  public User getUserByEmail(String email);

  public Future<List<UserDTO>> getUsersOfRule(List<String> ruleNames);

  public Future<List<Rule>> getRules();

  public Future<List<Role>> getRoles();

  public String deleteRole(Long roleId);

  public Future<List<Role>> getPublicAndOwnRoles(Long orgId);

  public Future<Optional<Role>> getRoleByRoleName(String roleName);

  public Role getRoleById(Long roleId);

  public Optional<User> addUserToOrg(Long userId, Long orgId) throws ExecutionException, InterruptedException;

  public Optional<User> addRoleToUser(Long userId, Long roleId) throws ExecutionException, InterruptedException;

  public Optional<Role> createRole(String name, String systemId, List<Rule> rules, OrganizationImpl organization, Boolean subjectRole, Role parent) throws ExecutionException, InterruptedException;

  public Optional<Role> editRole(Long roleId, String name, Boolean subjectRole, Long parentId, List<Rule> rules) throws ExecutionException, InterruptedException;

  public Optional<User> updateUser(Long uId, String username, String firstName, String lastName, String email,
                                   String password, Long o_id) throws ExecutionException, InterruptedException;
}
