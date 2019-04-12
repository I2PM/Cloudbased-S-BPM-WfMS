package at.fhjoanneum.ippr.commons.dto.user;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class RuleDTO implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long ruleId;
  private String type;
  private String scope;

  public RuleDTO() {}

  public RuleDTO(Long ruleId, String type, String scope) {
    this.ruleId = ruleId;
    this.type = type;
    this.scope = scope;
  }

  public Long getRuleId() {
    return ruleId;
  }

  public String getType() {
    return type;
  }

  public String getScope() {
    return scope;
  }
}
