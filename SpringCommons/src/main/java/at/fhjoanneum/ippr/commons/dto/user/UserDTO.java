package at.fhjoanneum.ippr.commons.dto.user;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserDTO implements Serializable {

    private static final long serialVersionUID = 7692113492836757571L;

    private Long uId;
    private String firstname;
    private String lastname;
    private List<RoleDTO> roles;
    private String email;
    private String organization;

    public UserDTO() {
    }

    public UserDTO(Long uId, String firstname, String lastname, List<RoleDTO> roles, String email, String organization) {
        this.uId = uId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.roles = roles;
        this.email = email;
        this.organization = organization;
    }

    public Long getUId() {
        return uId;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public List<RoleDTO> getRoles() {
        return roles;
    }

    public String getEmail() {
        return email;
    }

    public String getOrganization() {
        return organization;
    }
}
