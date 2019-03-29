package at.fhjoanneum.ippr.gateway.security.rbacmapping.retrieval;

import java.util.Map;

import at.fhjoanneum.ippr.gateway.security.persistence.entities.cache.CacheRole;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.cache.CacheRule;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.cache.CacheUser;

public interface RBACRetrievalService {

  Map<String, CacheUser> getSystemUsers(String path);

  Map<String, CacheRole> getSystemRoles(String path);

  Map<String, CacheRule> getSystemRules(String path);
}
