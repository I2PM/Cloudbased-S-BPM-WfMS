package at.fhjoanneum.ippr.gateway.api.controller.user;

import at.fhjoanneum.ippr.commons.dto.user.RoleDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Special object to cache user received by http request to forward them to the different services.
 */
public class HttpHeaderUser {
    private static final Logger LOG =
            LoggerFactory.getLogger(HttpHeaderUser.class);
    private static final String CLAIM_ID = "claims";
    private static final String USER_ID = "userId";
    private static final String ORGANIZATION_ID = "organizationId";
    private static final String ROLES_ID = "roles";

    private final String userId;
    private final String organizationId;
    private final List<RoleDTO> roles;

    private final ObjectMapper mapper;


    public HttpHeaderUser(final HttpServletRequest request) {
        final Claims claims = (Claims) request.getAttribute(CLAIM_ID);
        Preconditions.checkNotNull(claims);
        Preconditions.checkNotNull(claims.get(USER_ID));
        Preconditions.checkNotNull(claims.get(ROLES_ID));
        Preconditions.checkArgument(claims.get(ROLES_ID) instanceof List);


        final String userId = String.valueOf(claims.get(USER_ID));
        final String organizationId = String.valueOf(claims.get(ORGANIZATION_ID));
        final List<Map<String, Object>> roles = (List<Map<String, Object>>) claims.get(ROLES_ID);
        this.mapper = new ObjectMapper();
        this.userId = userId;
        this.organizationId = organizationId;
        this.roles = roles.stream().map(role -> mapper.convertValue(role, RoleDTO.class)).collect(Collectors.toList());
    }

    public String getUserId() {
        return userId;
    }

    public String getOrganizationId() {
        return organizationId;
    }

    public List<RoleDTO> getRoles() {
        return roles;
    }

    public HttpHeaders getHttpHeaders() {
        final HttpHeaders headers = new HttpHeaders();
        headers.add(USER_ID, userId);
        headers.add(ORGANIZATION_ID, organizationId);
        try {
            headers.add(ROLES_ID, mapper.writeValueAsString(roles));
        } catch (JsonProcessingException e) {
            LOG.error("Cold not serialize roles", e);
        }
        return headers;
    }
}
