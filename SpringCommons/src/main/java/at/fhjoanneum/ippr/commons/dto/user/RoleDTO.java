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
    private Long organisation_o_id;


    public RoleDTO() {
    }

    public RoleDTO(String name,
                   Long roleId,
                   List<RuleDTO> rules,
                   RoleDTO parent,
                   boolean subjectRole,
                   Long organisationId){

        this.name = name;
        this.roleId = roleId;
        this.rules = rules;
        this.parent = parent;
        this.subjectRole = subjectRole;
        this.organisation_o_id = organisationId;
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

    public Long getOrganisationId() {
        return organisation_o_id;
    }

}
