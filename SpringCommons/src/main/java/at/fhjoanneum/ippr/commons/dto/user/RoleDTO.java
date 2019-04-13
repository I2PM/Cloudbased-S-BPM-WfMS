package at.fhjoanneum.ippr.commons.dto.user;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement
public class RoleDTO {

  private String roleName;
  private Long roleId;
  private List<RuleDTO> rules;

  public RoleDTO() {}

  public RoleDTO(final Long roleId, final String roleName, final List<RuleDTO> rules) {
    this.roleName = roleName;
    this.roleId = roleId;
    this.rules = rules;
  }

  public Long getRoleId() {
    return roleId;
  }

  public String getRoleName() {
    return roleName;
  }

  public List<RuleDTO> getRules() {
    return rules;
  }
}
