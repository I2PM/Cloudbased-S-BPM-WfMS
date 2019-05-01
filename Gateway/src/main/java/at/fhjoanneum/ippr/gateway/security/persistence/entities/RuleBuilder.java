package at.fhjoanneum.ippr.gateway.security.persistence.entities;

import at.fhjoanneum.ippr.gateway.security.persistence.Builder;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.CrudType;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Resource;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;
import org.apache.commons.lang3.StringUtils;

import static com.google.common.base.Preconditions.checkArgument;

public class RuleBuilder implements Builder<Rule> {

    private String systemId;
    private CrudTypeImpl crudType;
    private ResourceImpl resource;

    public RuleBuilder systemId(final String systemId) {
        checkArgument(StringUtils.isNotBlank(systemId));
        this.systemId = systemId;
        return this;
    }

    public RuleBuilder crudType(final CrudType crudType) {
        checkArgument(crudType != null);
        checkArgument(crudType instanceof CrudTypeImpl);
        this.crudType = (CrudTypeImpl) crudType;
        return this;
    }

    public RuleBuilder resource(final Resource resource) {
        checkArgument(resource != null);
        checkArgument(resource instanceof ResourceImpl);
        this.resource = (ResourceImpl) resource;
        return this;
    }

    @Override
    public Rule build() {
        checkArgument(StringUtils.isNotBlank(systemId));
        checkArgument(resource != null);
        checkArgument(crudType != null);
        return new RuleImpl(systemId, crudType, resource);
    }
}
