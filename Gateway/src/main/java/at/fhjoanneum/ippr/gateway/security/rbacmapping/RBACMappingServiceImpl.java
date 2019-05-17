package at.fhjoanneum.ippr.gateway.security.rbacmapping;

import at.fhjoanneum.ippr.gateway.security.persistence.entities.*;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.cache.*;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.*;
import at.fhjoanneum.ippr.gateway.security.rbacmapping.retrieval.RBACRetrievalService;
import at.fhjoanneum.ippr.gateway.security.repositories.RBACRepository;
import com.google.common.collect.Maps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class RBACMappingServiceImpl implements RBACMappingService {

    private static final Logger LOG = LoggerFactory.getLogger(RBACMappingServiceImpl.class);

    @Autowired
    private RBACRetrievalService retrievalService;

    @Autowired
    private RBACRepository rbacRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${rbac.system.service.authentication}")
    private String rbacAuthStrategy;


    private final Map<String, Rule> ruleCache = Maps.newHashMap();
    private final Map<String, Role> rolesCache = Maps.newHashMap();

    @Override
    @Async
    public void mapUsers() {
        String csvPath = "";
        if (rbacAuthStrategy.equals("memory")) {
            csvPath = "/memoryusers/";
        } else if (rbacAuthStrategy.equals("database")) {
            csvPath = "/database_init/";
        }
        LOG.info(String.format("Start user %s mapping", rbacAuthStrategy));
        storeRules(retrievalService.getSystemRules(csvPath));
        storeRoles(retrievalService.getSystemRoles(csvPath));
        storeUsers(retrievalService.getSystemUsers(csvPath));
        //storeOrganizations(users);
        LOG.info(String.format("Finished user %s mapping", rbacAuthStrategy));
    }

    private void storeRules(final Map<String, CacheRule> rules) {
        rules.forEach((key, rule) -> {
            final Optional<Rule> ruleOpt = rbacRepository.getRuleBySystemId(rule.getSystemId());
            if (!ruleOpt.isPresent()) {
                final Resource dbResource = getOrCreateResource(rule.getResource());
                final CrudType dbCrudType = getOrCreateCrudType(rule.getCrudType());
                final Rule dbRule =
                        new RuleBuilder().systemId(rule.getSystemId()).resource(dbResource).crudType(dbCrudType).build();
                ruleCache.put(rule.getSystemId(), rbacRepository.saveRule(dbRule));
            }
        });
    }

    private CrudType getOrCreateCrudType(CacheCrudType cachedType) {
        final Optional<CrudType> crudType = rbacRepository.getCrudTypeBySystemId(cachedType.getSystemId());
        return crudType.orElseGet(() -> rbacRepository.saveCrudType(new CrudTypeImpl(cachedType.getSystemId())));
    }

    private Resource getOrCreateResource(CacheResource cachedResource) {
        final Optional<Resource> resource = rbacRepository.getRescourceBySystemId(cachedResource.getSystemId());
        return resource.orElseGet(() -> rbacRepository.saveResource(new ResourceImpl(cachedResource.getSystemId())));
    }

    private Role updateOrCreateRole(CacheRole cacheRole) {
        final Optional<Role> roleOpt = rbacRepository.getRoleBySystemId(cacheRole.getSystemId());
        Role parent = cacheRole.getParent() == null ? null : updateOrCreateRole(cacheRole.getParent());
        Role role = roleOpt.orElseGet(() -> new RoleImpl(null, cacheRole.getSystemId(), null, null, null, null));

        role.setName(cacheRole.getName());
        role.setOrganization(null); // TODO: Save org if necessary
        final List<Rule> newRules = cacheRole.getRules().stream()
                .map(rule -> ruleCache.get(rule.getSystemId())).collect(Collectors.toList());
        role.setRules(newRules);
        role.setSubjectRole(cacheRole.isSubjectRole());
        role.setParent(parent);
        role = rbacRepository.saveRole(role);
        rolesCache.put(role.getSystemId(), role);
        return role;
    }

    private void storeRoles(final Map<String, CacheRole> roles) {
        roles.forEach((key, cacheRole) -> {
            updateOrCreateRole(cacheRole);
        });
    }

    private void storeUsers(final Map<String, CacheUser> users) {
        users.values().stream().forEach(user -> {
            final Optional<User> userOpt = rbacRepository.getUserBySystemId(user.getSystemId());
            if (!userOpt.isPresent()) {
                final UserBuilder userBuilder =
                        new UserBuilder().systemId(user.getSystemId()).firstname(user.getFirstname())
                                .lastname(user.getLastname()).username(user.getUsername()).email(user.getEmail())
                                .password(passwordEncoder.encode(user.getPassword()));
                user.getRoles().stream().map(role -> rolesCache.get(role.getSystemId()))
                        .forEach(role -> userBuilder.addRole(role));
                rbacRepository.saveUser(userBuilder.build());
            } else {
                updateUser(user, userOpt);
            }
        });
    }

    private void updateUser(final CacheUser cacheUser, final Optional<User> userOpt) {
        final User dbUser = userOpt.get();
        if (!dbUser.getFirstname().equals(cacheUser.getFirstname())
                || !dbUser.getLastname().equals(cacheUser.getLastname())) {
            dbUser.setFirstname(cacheUser.getFirstname());
            dbUser.setLastname(cacheUser.getLastname());
            rbacRepository.saveUser(dbUser);
        }

        boolean toUpdate = false;
        if (dbUser.getRoles().size() != cacheUser.getRoles().size()) {
            toUpdate = true;
        }

        final Map<String, Role> roles =
                dbUser.getRoles().stream().collect(Collectors.toMap(Role::getSystemId, r -> r));
        if (cacheUser.getRoles().stream().filter(role -> !roles.containsKey(role.getSystemId()))
                .count() >= 1) {
            toUpdate = true;
        }

        if (toUpdate) {
            final List<Role> newRoles = cacheUser.getRoles().stream()
                    .map(role -> rolesCache.get(role.getSystemId())).collect(Collectors.toList());
            dbUser.setRoles(newRoles);
        }
    }

  /*private void storeOrganizations(final Map<String, CacheUser> users) {
    users.values().stream().map(CacheUser::getOrganization).forEach(organization -> {
      final Optional<Organization> orgaOpt = rbacRepository.getOrganizationBySystemId(organization.getSystemId());
      if(!orgaOpt.isPresent()) {
        final OrganizationBuilder organizationBuilder = new OrganizationBuilder().systemId(organization.getSystemId())
                .organizationName(organization.getOrganizationName()).organizationDescription(organization.getOrganizationDescription());
        rbacRepository.saveOrganization(organizationBuilder.build());
      } else {

      }
    });
  }*/
}
