package at.fhjoanneum.ippr.commons.dto.pmstorage;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class SubjectModelDTO {

  private Long smId;
  private String name;
  private List<Long> assignedRoles;

  public SubjectModelDTO() {}

  public SubjectModelDTO(final Long smId, final String name, final List<Long> assignedRoles) {
    this.smId = smId;
    this.name = name;
    this.assignedRoles = assignedRoles;
  }

  public Long getSmId() {
    return smId;
  }

  public String getName() {
    return name;
  }

  public List<Long> getAssignedRoles() {
    return assignedRoles;
  }
}
