package at.fhjoanneum.ippr.gateway.security.persistence;

import at.fhjoanneum.ippr.commons.dto.user.OrganizationDTO;
import at.fhjoanneum.ippr.commons.dto.user.RoleDTO;
import at.fhjoanneum.ippr.commons.dto.user.RuleDTO;
import at.fhjoanneum.ippr.commons.dto.user.UserDTO;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.*;

import java.util.List;
import java.util.stream.Collectors;

public class DTOFactory {

    public static UserDTO toDTO(User user) {
        List<RoleDTO> roles = user.getRoles().stream().map(role -> toDTO(role)).collect(Collectors.toList());
        Organization org = user.getOrganization();
        String orgName = org != null ? org.getOrganizationName() : null;
        return new UserDTO(user.getUId(), user.getFirstname(), user.getLastname(), roles, user.getEmail(), orgName);
    }

    public static RoleDTO toDTO(Role role) {
        RoleDTO roleParent = null;
        OrganizationDTO roleOrg = null;
        if (role.getParent() != null) {
            roleParent = toDTO(role.getParent());
        }
        if (role.getOrganization() != null) {
            roleOrg = toDTO(role.getOrganization());
        }
        return new RoleDTO(role.getName(), role.getRoleId(), toDTOs(role.getRules()), roleParent, role.getSubjectRole(), roleOrg);
    }

    public static List<RuleDTO> toDTOs(List<? extends Rule> rules) {
        return rules.stream().map(rule -> toDTO(rule)).collect(Collectors.toList());
    }

    public static RuleDTO toDTO(Rule rule) {
        return new RuleDTO(rule.getRuleId(), rule.getSystemId(), rule.getCrudType().getSystemId(), rule.getResource().getSystemId());
    }

    public static OrganizationDTO toDTO(Organization organization) {
        return new OrganizationDTO(organization.getOId(), organization.getOrganizationName(), organization.getDescription());
    }

}

