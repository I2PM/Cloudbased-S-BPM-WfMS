package at.fhjoanneum.ippr.gateway.security.persistence.entities;

import static com.google.common.base.Preconditions.checkArgument;

import org.apache.commons.lang3.StringUtils;

import at.fhjoanneum.ippr.gateway.security.persistence.Builder;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;

public class RuleBuilder implements Builder<Rule> {

    private String systemId;
    private String scope;
    private String type;

    public RuleBuilder scope(final String scope) {
        checkArgument(StringUtils.isNotBlank(scope));
        this.scope = scope;
        return this;
    }

    public RuleBuilder type(final String type) {
        checkArgument(StringUtils.isNotBlank(type));
        this.type = type;
        return this;
    }

    public RuleBuilder systemId(final String systemId) {
        checkArgument(StringUtils.isNotBlank(systemId));
        this.systemId = systemId;
        return this;
    }

    @Override
    public Rule build() {
        checkArgument(StringUtils.isNotBlank(scope));
        checkArgument(StringUtils.isNotBlank(type));
        checkArgument(StringUtils.isNotBlank(systemId));
        return new RuleImpl(systemId, type, scope);
    }
}
