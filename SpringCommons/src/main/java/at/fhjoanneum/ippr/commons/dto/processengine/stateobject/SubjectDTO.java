package at.fhjoanneum.ippr.commons.dto.processengine.stateobject;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class SubjectDTO implements Serializable {

  private static final long serialVersionUID = -1944266562133136988L;

  private Long smId;
  private Long userId;
  private String subjectName;
  private List<Long> assignedRoles;

  public SubjectDTO() {}

  public SubjectDTO(final Long smId, final Long userId, final String subjectName,
      final List<Long> assignedRoles) {
    this.smId = smId;
    this.userId = userId;
    this.subjectName = subjectName;
    this.assignedRoles = assignedRoles;
  }

  public Long getSmId() {
    return smId;
  }

  public Long getUserId() {
    return userId;
  }

  public String getSubjectName() {
    return subjectName;
  }

  public List<Long> getAssignedRoles() {
    return assignedRoles;
  }
}
