package at.fhjoanneum.ippr.gateway.security.persistence.entities;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.CrudType;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Resource;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;
import at.fhjoanneum.ippr.gateway.security.services.RBACService;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Entity(name = "rule")
@XmlRootElement
public class RuleImpl implements Rule, Serializable {

    private static final long serialVersionUID = 4352903291274094588L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ruleId;

    @Column(unique = true)
    @NotBlank
    private String systemId;

    @ManyToOne
    @NotNull
    private CrudTypeImpl crudType;

    @ManyToOne
    @NotNull
    private ResourceImpl resource;

    public RuleImpl() {
    }

    public RuleImpl(String systemId, CrudTypeImpl crudType, ResourceImpl resource) {
        this.systemId = systemId;
        this.crudType = crudType;
        this.resource = resource;
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
        this.systemId = systemId;
    }

    @Override
    public CrudType getCrudType() {
        return crudType;
    }

    @Override
    public void setCrudType(CrudTypeImpl crudType) {
        this.crudType = crudType;
    }

    @Override
    public Resource getResource() {
        return resource;
    }

    @Override
    public void setResource(ResourceImpl resource) {
        this.resource = resource;
    }
}
