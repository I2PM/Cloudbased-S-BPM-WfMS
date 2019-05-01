package at.fhjoanneum.ippr.gateway.security.persistence.entities;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.Resource;
import com.google.common.base.Objects;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

import static com.google.common.base.Preconditions.checkArgument;

@Entity(name = "resource")
@XmlRootElement
public class ResourceImpl implements Resource, Serializable {

    private static final long serialVersionUID = 4352903292474094588L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long resourceId;

    @Column(unique = true)
    @NotBlank
    private String systemId;

    public ResourceImpl() {
    }

    public ResourceImpl(final String systemId) {
        this.systemId = systemId;
    }

    @Override
    public Long getResourceId() {
        return resourceId;
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
    public boolean equals(final Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final ResourceImpl other = (ResourceImpl) obj;
        if (resourceId == null) {
            if (other.resourceId != null)
                return false;
        } else if (!resourceId.equals(other.resourceId))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(resourceId);
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE).append("resourceId", resourceId)
                .append("systemId", systemId).toString();
    }
}
