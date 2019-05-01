package at.fhjoanneum.ippr.commons.dto.user;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class RuleDTO implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long ruleId;
  private String systemId;
  private String crudType;
  private String resource;

  public RuleDTO() {
  }

  public RuleDTO(Long ruleId, String systemId, String crudType, String resource) {
    this.ruleId = ruleId;
    this.systemId = systemId;
    this.crudType = crudType;
    this.resource = resource;
  }

  public Long getRuleId() {
    return ruleId;
  }

  public String getSystemId() {
    return systemId;
  }

  public String getCrudType() {
    return crudType;
  }

  public String getResource() {
    return resource;
  }
}
