package at.fhjoanneum.ippr.gateway.security.repositories;

import java.util.List;
import java.util.Optional;

import at.fhjoanneum.ippr.gateway.security.persistence.entities.*;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.Lists;

@Repository
public class RBACRepositoryImpl implements RBACRepository {
  private static final Logger LOG = LoggerFactory.getLogger(RBACRepositoryImpl.class);

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private ResourceRepository resourceRepository;

  @Autowired
  private CrudTypeRepository crudTypeRepository;

  @Autowired
  private RuleRepository ruleRepository;

  @Override
  public User saveUser(final User user) {
    return userRepository.save((UserImpl) user);
  }

  @Override
  public Role saveRole(final Role group) {
    return roleRepository.save((RoleImpl) group);
  }

  @Override
  public Resource saveResource(final Resource resource) {
    return resourceRepository.save((ResourceImpl) resource);
  }

  @Override
  public Rule saveRule(Rule rule) {
    return ruleRepository.save((RuleImpl) rule);
  }

  @Override
  public CrudType saveCrudType(CrudType crudType) {
    return crudTypeRepository.save((CrudTypeImpl) crudType);
  }

  @Override
  public Optional<User> getUserByUserId(final Long userId) {
    return Optional.ofNullable(userRepository.findOne(userId));
  }

  @Override
  public Optional<User> getUserBySystemId(final String systemId) {
    return Optional.ofNullable(userRepository.findBySystemId(systemId));
  }

  @Override
  public Optional<User> getUserByUsername(final String username) {
    return Optional.ofNullable(userRepository.findByUsername(username));
  }

  @Override
  public Optional<User> getUserByEmail(final String email) {
    return Optional.ofNullable(userRepository.findByEmail(email));
  }

  @Override
  public List<User> getUsersByRoleName(final String roleName) {
    return Lists.newArrayList(userRepository.findByRoleName(roleName));
  }

  @Override
  public Optional<Role> getRoleByRoleName(final String roleName) {
    return Optional.ofNullable(roleRepository.findByRoleName(roleName));
  }

  @Override
  public Optional<Role> getRoleBySystemId(final String systemId) {
    return Optional.ofNullable(roleRepository.findBySystemId(systemId));
  }

  @Override
  public Optional<Rule> getRuleBySystemId(final String systemId) {
    return Optional.ofNullable(ruleRepository.findBySystemId(systemId));
  }

  @Override
  public List<User> getUsersByRuleNames(final List<String> ruleNames) {
    return Lists.newArrayList(userRepository.findByRuleNames(ruleNames));
  }

  @Override
  public List<Resource> getRules() {
    return Lists.newArrayList(resourceRepository.findAll());
  }

  @Override
  public List<Role> getRoles() { return Lists.newArrayList(roleRepository.findAll()); }

  @Override
  public List<Role> getRolesOfOrganization(Long oId) {

    LOG.info("Entered function getRolesOfOrganization, with id: "+oId);

    return Lists.newArrayList(roleRepository.findRolesOfOrganization(oId));
  }

  @Override
  public Optional<CrudType> getCrudTypeBySystemId(String systemId) {
    return Optional.ofNullable(crudTypeRepository.findBySystemId(systemId));
  }

  @Override
  public Optional<Resource> getRescourceBySystemId(String systemId) {
    return Optional.ofNullable(resourceRepository.findBySystemId(systemId));
  }


  @Repository
  interface UserRepository extends PagingAndSortingRepository<UserImpl, Long> {

    @Query(value = "SELECT * FROM user WHERE system_id = :systemId", nativeQuery = true)
    UserImpl findBySystemId(@Param("systemId") String systemId);

    @Query(value = "SELECT * FROM user WHERE username = :username", nativeQuery = true)
    UserImpl findByUsername(@Param("username") String username);

    @Query(value = "SELECT * FROM user WHERE email = :email", nativeQuery = true)
    UserImpl findByEmail(@Param("email") String email);

    @Query(
        value = "select u.* from user u join user_role_map ugm on ugm.u_id = u.u_id "
            + "join role r on r.role_id = ugm.role_id " + "where lower(r.name) = lower(:roleName) ",
        nativeQuery = true)
    List<UserImpl> findByRoleName(@Param("roleName") String roleName);

    @Query(
        value = "select distinct(u.u_id), u.* from rule join role_rule_map rrm on rrm.rule_id = rule.rule_id "
            + "join user_role_map urm on urm.role_id = rrm.role_id "
            + "join user u on urm.u_id = u.u_id where rule.name in ( :ruleNames )",
        nativeQuery = true)
    List<UserImpl> findByRuleNames(@Param("ruleNames") List<String> ruleNames);
  }

  @Repository
  interface RoleRepository extends PagingAndSortingRepository<RoleImpl, Long> {

    @Query(value = "SELECT * FROM role WHERE system_id = :systemId", nativeQuery = true)
    RoleImpl findBySystemId(@Param("systemId") String systemId);

    @Query(value = "SELECT * FROM role WHERE lower(NAME) = lower(:roleName)", nativeQuery = true)
    RoleImpl findByRoleName(@Param("roleName") String roleName);

    @Query(value = "SELECT * FROM role WHERE organization_o_id = :organizationId", nativeQuery = true)
    RoleImpl[] findRolesOfOrganization(@Param("organizationId") Long oId);
  }

  @Repository
  interface ResourceRepository extends CrudRepository<ResourceImpl, Long> {

    @Query(value = "SELECT * FROM resource WHERE system_id = :systemId", nativeQuery = true)
    ResourceImpl findBySystemId(@Param("systemId") String systemId);
  }

  @Repository
  interface RuleRepository extends CrudRepository<RuleImpl, Long> {

    @Query(value = "SELECT * FROM rule WHERE system_id = :systemId", nativeQuery = true)
    RuleImpl findBySystemId(@Param("systemId") String systemId);
  }

  @Repository
  interface CrudTypeRepository extends CrudRepository<CrudTypeImpl, Long> {

    @Query(value = "SELECT * FROM crud_type WHERE system_id = :systemId", nativeQuery = true)
    CrudTypeImpl findBySystemId(@Param("systemId") String systemId);
  }
}
