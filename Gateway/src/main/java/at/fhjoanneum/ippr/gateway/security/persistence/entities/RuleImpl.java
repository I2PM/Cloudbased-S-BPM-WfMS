package at.fhjoanneum.ippr.gateway.security.persistence.entities;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;
import com.google.common.base.Objects;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

import static com.google.common.base.Preconditions.checkArgument;

@Entity(name = "rule")
@XmlRootElement
public class RuleImpl implements Rule, Serializable {

    private static final long serialVersionUID = 4352903292474094588L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ruleId;

    @Column(unique = true)
    @NotBlank
    private String systemId;

    @Column
    @NotBlank
    private String type;

    @Column
    @NotBlank
    private String scope;

    public RuleImpl() {
    }

    public RuleImpl(final String systemId, final String type, final String scope) {
        this.systemId = systemId;
        this.type = type;
        this.scope = scope;
    }

    @Override
    public Long getRuleId() {
        return ruleId;
    }

    @Override
    public String getSystemId() {
        return systemId;
    }

    @Override
    public void setSystemId(String systemId) {
        checkArgument(StringUtils.isNotBlank(systemId));
        this.systemId = systemId;
    }

    @Override
    public String getType() {
        return type;
    }

    public void setType(String type) {
        checkArgument(StringUtils.isNotBlank(type));
        this.type = type;
    }

    @Override
    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        checkArgument(StringUtils.isNotBlank(scope));
        this.scope = scope;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final RuleImpl other = (RuleImpl) obj;
        if (ruleId == null) {
            if (other.ruleId != null)
                return false;
        } else if (!ruleId.equals(other.ruleId))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(ruleId);
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE).append("ruleId", ruleId)
                .append("type", type).append("scope", scope).toString();
    }
}
