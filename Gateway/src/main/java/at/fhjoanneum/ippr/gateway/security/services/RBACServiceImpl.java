package at.fhjoanneum.ippr.gateway.security.services;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

import at.fhjoanneum.ippr.gateway.api.repositories.OrganizationRepository;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.OrganizationImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Organization;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Role;
import com.google.common.collect.Lists;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import at.fhjoanneum.ippr.commons.dto.user.RoleDTO;
import at.fhjoanneum.ippr.commons.dto.user.RuleDTO;
import at.fhjoanneum.ippr.commons.dto.user.UserDTO;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.User;
import at.fhjoanneum.ippr.gateway.security.repositories.RBACRepository;

@Service
public class RBACServiceImpl implements RBACService {

  @Autowired
  private RBACRepository rbacRepository; 

  @Autowired
  private OrganizationRepository organizationRepository;

  @Override
  public User getUserByUserId(final Long uId) {
    return rbacRepository.getUserByUserId(uId).get();
  }

  @Async
  @Override
  public Future<List<UserDTO>> getUsersOfRule(final List<String> ruleNames) {
    final List<User> users = rbacRepository.getUsersByRuleNames(ruleNames);
    return new AsyncResult<List<UserDTO>>(users.stream().map(user -> {
      final List<RoleDTO> roles = user.getRoles().stream()
          .map(role -> new RoleDTO(role.getRoleId(), role.getName())).collect(Collectors.toList());
      final List<RuleDTO> rules = user.getRules().stream()
          .map(rule -> new RuleDTO(rule.getRuleId(), rule.getName())).collect(Collectors.toList());
      return new UserDTO(user.getUId(), user.getFirstname(), user.getLastname(), roles, rules);
    }).collect(Collectors.toList()));
  }

  @Override
  public Future<List<Rule>> getRules() {
    return new AsyncResult<List<Rule>>(rbacRepository.getRules());
  }

  @Override
  public Future<List<Role>> getRoles() { return new AsyncResult<List<Role>>(rbacRepository.getRoles()); }

  @Override
  public Future<Optional<Role>> getRoleByRoleName(String roleName) {
    return new AsyncResult<Optional<Role>>(rbacRepository.getRoleByRoleName(roleName));
  }

  @Override
  public Optional<User> updateUser(final Long userId, final String username, final String firstName,
                                   final String lastName, final String email, final String password, final Long o_id)
          throws ExecutionException, InterruptedException {

    Optional<User> userToUpdate = rbacRepository.getUserByUserId(userId);
    Optional<Organization> orgToUpdate = null;

    if (!userToUpdate.isPresent()) {
      return Optional.empty();
    }
    if (o_id != null) {
      orgToUpdate = organizationRepository.getOrganizationByOrganizationId(o_id);
    }
    // Update user
    if (username != null) userToUpdate.get().setUsername(username);
    if (firstName != null) userToUpdate.get().setFirstname(firstName);
    if (lastName != null) userToUpdate.get().setLastname(lastName);
    if (email != null) userToUpdate.get().setEmail(email);
    if (password != null) userToUpdate.get().setPassword(password);
    if (orgToUpdate != null && orgToUpdate.isPresent() && userToUpdate.get().getOrganization() == null) {
      userToUpdate.get().setOrganization((OrganizationImpl) orgToUpdate.get());
      Optional<Role> empRole = this.getRoleByRoleName("ORG_EMP").get();
      List<Role> newUserRoles = Lists.newArrayList();
      newUserRoles.addAll(userToUpdate.get().getRoles());
      newUserRoles.add(empRole.get());
      userToUpdate.get().setRoles(newUserRoles);
    }

    rbacRepository.saveUser(userToUpdate.get());
    return rbacRepository.getUserByUserId(userId);
  }
}
