package at.fhjoanneum.ippr.commons.dto.user;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement
public class RoleDTO {
  private String name;
  private Long roleId;
  private List<RuleDTO> rules;


  public RoleDTO() {}

  public RoleDTO(String name, Long roleId, List<RuleDTO> rules) {
    this.name = name;
    this.roleId = roleId;
    this.rules = rules;
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
}
