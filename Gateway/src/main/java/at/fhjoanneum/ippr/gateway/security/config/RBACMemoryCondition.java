package at.fhjoanneum.ippr.gateway.security.config;

import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

import at.fhjoanneum.ippr.gateway.security.config.RBACServiceCondition;

public class RBACMemoryCondition implements RBACServiceCondition {

  private static String CONFIG_VALUE = "memory";

  @Override
  public boolean matches(final ConditionContext context, final AnnotatedTypeMetadata metadata) {
    return context.getEnvironment().getProperty(PROPERTY_NAME).contains(CONFIG_VALUE);
  }

}
