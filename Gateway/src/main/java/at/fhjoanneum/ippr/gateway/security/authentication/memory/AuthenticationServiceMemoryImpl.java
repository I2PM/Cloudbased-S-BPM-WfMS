package at.fhjoanneum.ippr.gateway.security.authentication.memory;

import java.util.Map;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import at.fhjoanneum.ippr.gateway.security.authentication.AuthenticationService;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.cache.CacheUser;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.User;
import at.fhjoanneum.ippr.gateway.security.rbacmapping.retrieval.RBACRetrievalService;
import at.fhjoanneum.ippr.gateway.security.repositories.RBACRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AuthenticationServiceMemoryImpl implements AuthenticationService {

  private static final Logger LOG = LoggerFactory.getLogger(AuthenticationServiceMemoryImpl.class);

  @Autowired
  private RBACRetrievalService retrievalService;

  @Autowired
  private RBACRepository rbacRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public Optional<User> authenticateUser(final String email, final String password) {
    if (StringUtils.isBlank(email) || StringUtils.isBlank(password)) {
      return Optional.empty();
    }

    final Map<String, CacheUser> systemUsers = retrievalService.getSystemUsers("/memoryusers/");
    final CacheUser cacheUser = systemUsers.get(email);

    if (cacheUser == null) {
      LOG.info("Could not find user with email: {}", email);
      return Optional.empty();
    }
    if (!passwordEncoder.matches(password, passwordEncoder.encode(cacheUser.getPassword()))) {
      LOG.info("Wrong password for user with email: {}", email);
      return Optional.empty();
    }

    return rbacRepository.getUserByEmail(email);
  }

}
