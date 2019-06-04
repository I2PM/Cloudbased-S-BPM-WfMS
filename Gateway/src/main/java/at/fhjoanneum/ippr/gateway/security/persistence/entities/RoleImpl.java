package at.fhjoanneum.ippr.gateway.security.persistence.entities;

import static com.google.common.base.Preconditions.checkArgument;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.Organization;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.hibernate.validator.constraints.NotBlank;

import com.google.common.base.Objects;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;

import at.fhjoanneum.ippr.gateway.security.persistence.objects.Role;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "role")
@XmlRootElement
public class RoleImpl implements Role, Serializable {

    private static final Logger LOG = LoggerFactory.getLogger(RoleImpl.class);

    private static final long serialVersionUID = -3752242631499306265L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long roleId;

    @Column
    @NotBlank
    private String name;

    @Column(unique = true)
    @NotBlank
    private String systemId;

    @Column
    private Long o_id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "role_rule_map", joinColumns = {@JoinColumn(name = "role_id")},
            inverseJoinColumns = {@JoinColumn(name = "rule_id")})
    private List<RuleImpl> rules = Lists.newArrayList();


    /*
    @JoinTable(name = "organization", joinColumns = {@JoinColumn(name  = "organization_o_id")},
            inverseJoinColumns = {@JoinColumn(name  = "oId")})
    @ManyToOne(fetch = FetchType.EAGER)*/
    @Transient
    private OrganizationImpl organization;


    @Column
    @NotNull
    private Boolean subjectRole;

    @ManyToOne
    private RoleImpl parent;


    RoleImpl() {

        LOG.info("in std constructor!");
        LOG.info("ID: "+roleId);
    }

    public RoleImpl(String name, String systemId, List<RuleImpl> rules, OrganizationImpl organization, Boolean subjectRole, RoleImpl parent) {
        this.name = name;
        this.systemId = systemId;
        this.rules = rules;
        this.subjectRole = subjectRole;
        this.parent = parent;
        this.organization = organization;
    }

    @Override
    public Long getRoleId() {
        return roleId;
    }

    @Override
    public String getSystemId() {
        return systemId;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public OrganizationImpl getOrganization() {
        return organization;
    }

    @Override
    public void setOrganization(OrganizationImpl organization) {
        this.organization = organization;
    }

    @Override
    public boolean getSubjectRole() {
        return subjectRole;
    }

    @Override
    public void setSubjectRole(boolean subjectRole) {
        this.subjectRole = subjectRole;
    }

    public RoleImpl getParent() {
        return parent;
    }

    public void setParent(Role parent) {
        checkArgument(parent instanceof RoleImpl || parent == null);
        this.parent = (RoleImpl) parent;
    }

    @Override
    public void setName(final String name) {
        checkArgument(StringUtils.isNotBlank(name));
        this.name = name;
    }

    @Override
    public List<Rule> getRules() {
        return ImmutableList.copyOf(rules);
    }

    @Override
    public void setRules(final List<Rule> rules) {
        this.rules = rules.stream().map(rule -> (RuleImpl) rule).collect(Collectors.toList());
    }

    @Override
    public boolean equals(final Object obj) {
        if (obj == null) {
            return false;
        }
        if (!Role.class.isAssignableFrom(obj.getClass())) {
            return false;
        }
        final Role other = (Role) obj;
        if ((this.roleId == null) ? (other.getRoleId() != null)
                : !this.roleId.equals(other.getRoleId())) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(roleId);
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE).append("roleId", roleId)
                .append("name", name).toString();
    }

    @Override
    public Long getOrgId()
    {
        return o_id;
    }
}
