package at.fhjoanneum.ippr.commons.dto.user;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement
public class RoleDTO {
    private String name;
    private Long roleId;
    private List<RuleDTO> rules;
    private RoleDTO parent;
    private boolean subjectRole;
    private OrganizationDTO organisation;


    public RoleDTO() {
    }

    public RoleDTO(String name,
                   Long roleId,
                   List<RuleDTO> rules,
                   RoleDTO parent,
                   boolean subjectRole,
                   OrganizationDTO organisation){

        this.name = name;
        this.roleId = roleId;
        this.rules = rules;
        this.parent = parent;
        this.subjectRole = subjectRole;
        this.organisation = organisation;
    }

    public Long getRoleId() {
        return roleId;
    }

    public String getName() {
        return name;
    }

    public List<RuleDTO> getRules() {
        return rules;
    }

    public RoleDTO getParent() {
        return parent;
    }

    public boolean isSubjectRole() {
        return subjectRole;
    }

    public OrganizationDTO getOrganisation() {
        return organisation;
    }

}
