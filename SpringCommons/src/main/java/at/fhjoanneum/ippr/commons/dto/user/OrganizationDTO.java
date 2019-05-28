package at.fhjoanneum.ippr.commons.dto.user;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@XmlRootElement
public class OrganizationDTO implements Serializable {

    private static final long serialVersionUID = 7692113492836757571L;

    private Long oId;
    private String organizationName;
    private String getOrganizationDescription;


    public OrganizationDTO() {
    }

    public OrganizationDTO(Long oId, String organizationName, String getOrganizationDescription) {
        this.oId = oId;
        this.organizationName = organizationName;
        this.getOrganizationDescription = getOrganizationDescription;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getoId() {
        return oId;
    }

       public String getOrganizationName() {
        return organizationName;
    }

       public String getGetOrganizationDescription() {
        return getOrganizationDescription;
    }

}