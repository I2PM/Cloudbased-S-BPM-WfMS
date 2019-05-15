package at.fhjoanneum.ippr.gateway.security.persistence.entities;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.CrudType;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

import static com.google.common.base.Preconditions.checkArgument;

@Entity(name = "crud_type")
@XmlRootElement
public class CrudTypeImpl implements CrudType, Serializable {
    private static final long serialVersionUID = 4352903423474094588L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long crudTypeId;

    @Column(unique = true)
    @NotBlank
    private String systemId;

    public CrudTypeImpl() {
    }

    public CrudTypeImpl(String systemId) {
        this.systemId = systemId;
    }

    public Long getCrudTypeId() {
        return crudTypeId;
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
}
