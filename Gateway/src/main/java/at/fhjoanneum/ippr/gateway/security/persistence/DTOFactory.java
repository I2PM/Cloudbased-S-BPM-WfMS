package at.fhjoanneum.ippr.gateway.security.persistence;

import at.fhjoanneum.ippr.commons.dto.user.RoleDTO;
import at.fhjoanneum.ippr.commons.dto.user.RuleDTO;
import at.fhjoanneum.ippr.commons.dto.user.UserDTO;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Role;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.User;

import java.util.List;
import java.util.stream.Collectors;

public class DTOFactory {

    public static UserDTO createUserDTO(User user) {
        List<RoleDTO> roles = user.getRoles().stream().map(role -> createRoleDTO(role)).collect(Collectors.toList());
        return new UserDTO(user.getUId(),user.getFirstname(),user.getLastname(), roles, user.getEmail(), user.getOrganization().getOrganizationName());
    }
    public static RoleDTO createRoleDTO(Role role){
        List<RuleDTO> rules = role.getRules().stream().map(rule -> createRuleDTO(rule)).collect(Collectors.toList());
        return new RoleDTO(role.getRoleId(), role.getName(), rules);
    }
    public static RuleDTO createRuleDTO(Rule rule){
        return new RuleDTO(rule.getRuleId(),rule.getType(),rule.getScope());
    }
}

