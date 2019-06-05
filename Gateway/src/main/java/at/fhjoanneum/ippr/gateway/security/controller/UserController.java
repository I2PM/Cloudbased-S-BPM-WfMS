package at.fhjoanneum.ippr.gateway.security.controller;

import at.fhjoanneum.ippr.commons.dto.user.RoleDTO;
import at.fhjoanneum.ippr.commons.dto.user.UserDTO;
import at.fhjoanneum.ippr.gateway.api.services.OrganizationService;
import at.fhjoanneum.ippr.gateway.security.authentication.AuthenticationService;
import at.fhjoanneum.ippr.gateway.security.persistence.DTOFactory;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.OrganizationImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.RoleImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.RuleImpl;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Organization;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Role;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.Rule;
import at.fhjoanneum.ippr.gateway.security.persistence.objects.User;
import at.fhjoanneum.ippr.gateway.security.persistence.entities.UserImpl;
import at.fhjoanneum.ippr.gateway.security.registration.RegistrationService;
import at.fhjoanneum.ippr.gateway.security.services.RBACService;
import at.fhjoanneum.ippr.gateway.security.services.RBACServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.Future;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.concurrent.Future;
import com.google.common.collect.Lists;
import org.springframework.scheduling.annotation.AsyncResult;


@RestController
@RequestMapping(produces = "application/json; charset=UTF-8")
public class UserController {

  private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

  @Autowired
  private OrganizationService organizationService;

  @Autowired
  private AuthenticationService authenticationService;

  @Autowired
  private RegistrationService registrationService;

  @Autowired
  private RBACService rbacService;

  @RequestMapping(value = "user/login", method = RequestMethod.POST)
  public ResponseEntity<LoginResponse> login(@RequestBody final UserLogin login) {

    final Optional<User> userOpt =
        authenticationService.authenticateUser(login.email, login.password);

    if (!userOpt.isPresent()) {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    final User user = userOpt.get();

    final List<RoleDTO> roles = DTOFactory.toDTO(user).getRoles();

    final LoginResponse loginResponse = new LoginResponse(
        Jwts.builder().setSubject(user.getUsername()).claim("userId", user.getUId())
            .claim("email", user.getEmail())
            .claim("roles", roles).setIssuedAt(new Date())
            .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusWeeks(1)))
            .signWith(SignatureAlgorithm.HS256, "secretkey").compact());

    return new ResponseEntity<>(loginResponse, HttpStatus.OK);
  }

  @RequestMapping(value = "user/register", method = RequestMethod.POST)
  public ResponseEntity<RegisterResponse> register(@RequestBody final UserRegister register) {

    final Optional<User> userOpt =
            registrationService.registerUser(register.firstname, register.lastname, register.username, register.email, register.password);

    if (!userOpt.isPresent()) {
      return new ResponseEntity<>(new RegisterResponse("Registration failed: Payload incomplete"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new ResponseEntity<>(new RegisterResponse("Ok"), HttpStatus.OK);
  }

  @RequestMapping(value = "user/register/checkIfMailTaken", method = RequestMethod.POST)
  public ResponseEntity<CheckMailResponse> checkIfMailExists(@RequestBody final RegisterMailCheck mailCheck) {

    final Optional<User> userOpt = registrationService.checkIfMailTaken(mailCheck.email);

    if (userOpt == null) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    } else if (!userOpt.isPresent()) {
      return new ResponseEntity<>(new CheckMailResponse(false), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(new CheckMailResponse(true), HttpStatus.OK);
    }
  }

  @RequestMapping(value = "api/me", method = {RequestMethod.GET})
  public User getLoggedInUser(final HttpServletRequest request) throws ServletException {
    final Claims claims = (Claims) request.getAttribute("claims");
    final Integer userId = (Integer) claims.get("userId");

    return rbacService.getUserByUserId(userId.longValue());
  }

  @RequestMapping(value = "api/user/{userId}", method = RequestMethod.GET)
  public User getUser(final HttpServletRequest request,
      @PathVariable(name = "userId", required = true) final Long userId) {
    return rbacService.getUserByUserId(userId);
  }

  @RequestMapping(value = "api/user/getUserByEmail/{email}/getUserData", method = RequestMethod.GET)
  public User getUserByEmail(final HttpServletRequest request,
                             @PathVariable(name = "email", required = true) final String email) {
    return rbacService.getUserByEmail(email);

  }


  @RequestMapping(value = "api/user/{userId}/addUserToOrg/{orgId}", method = RequestMethod.PUT)
  public ResponseEntity<UpdateResponse> updateUser(@PathVariable(name = "userId", required = true) final Long userId,
                                                   @PathVariable(name="orgId", required = true) final Long orgId) throws ExecutionException, InterruptedException {

    final Optional<User> updatedUser =
            rbacService.addUserToOrg(userId, orgId);

    return updatedUser.map(user1 -> new ResponseEntity<>(new UpdateResponse("Ok", user1), HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(new UpdateResponse(String.format("Updating User with id %s failed.", userId), null),
                    HttpStatus.INTERNAL_SERVER_ERROR));

  }

  @RequestMapping(value = "api/user/addRoleToUser/{userId}/{roleId}", method = RequestMethod.POST)
  public ResponseEntity<UpdateResponse> addRoleToUser(@PathVariable(name = "userId", required = true) final Long userId,
                                                   @PathVariable(name="roleId", required = true) final Long roleId) throws ExecutionException, InterruptedException {

    final Optional<User> addRoleToUser =
            rbacService.addRoleToUser(userId, roleId);

    return addRoleToUser.map(user1 -> new ResponseEntity<>(new UpdateResponse("Ok", user1), HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(new UpdateResponse(String.format("Adding role with id %s failed.", roleId), null),
                    HttpStatus.INTERNAL_SERVER_ERROR));

  }

  @RequestMapping(value = "api/user/myOrg", method = RequestMethod.GET)
  public @ResponseBody Future<List<User>> getUsersFromOrg(final HttpServletRequest request)
  {
    Future<List<User>>employees=new AsyncResult<List<User>>(Lists.newArrayList());

    try {
      Organization orgMine = getLoggedInUser(request).getOrganization();
      if (orgMine != null) {

        LOG.info("serwus do bin i! getUsersFromOrg it is!");
        employees = new AsyncResult<List<User>>(Lists.newArrayList(orgMine.getEmployees()));

        //employees = rbacService.getUsersByOrgId(oId);

        //LOG.info("employee count: "+employees.size());

        //Future<List<UserDTO>>users= rbacService.getUsersByOrgId(oId);
        //.stream().map(user -> DTOFactory.toDTO(user)).collect(Collectors.toList());
        //LOG.info("users count: "+users.size());

        //return users;
      }
    }
    catch(ServletException ex)
    {
      LOG.error(ex.getMessage());
    }
      return employees;
              //orgMine.getEmployees().stream().map(user -> DTOFactory.toDTO(user)).collect(Collectors.toList());

  }

  //all Orgs
  //List<Organization> allOrganizations = organizationService.getOrganizations().get();


  @RequestMapping(value = "api/processes/users/rule/{rules}", method = RequestMethod.GET)
  public @ResponseBody Callable<List<UserDTO>> getUsersWithRule(
      @PathVariable("rules") final String[] rules) {

    return () -> {
      return rbacService.getUsersOfRule(Arrays.asList(rules)).get();
    };
  }

  @RequestMapping(value = "api/rules", method = RequestMethod.GET)
  public @ResponseBody Callable<List<Rule>> getRules() {
    return () -> {
      return rbacService.getRules().get();
    };
  }

  @RequestMapping(value = "api/roles", method = RequestMethod.GET)
  public @ResponseBody Callable<List<Role>> getRoles() {
    return () -> {
      return rbacService.getRoles().get();
    };
  }

  @RequestMapping(value = "api/roles/{roleId}", method = RequestMethod.DELETE)
  public @ResponseBody String deleteRole(final HttpServletRequest request,
                                                       @PathVariable(name = "roleId", required = true) final Long roleId) {
    rbacService.deleteRole(roleId);
    return "Role deleted";
  }


  @RequestMapping(value = "api/roles/publicAndOwn/{oId}", method = RequestMethod.GET)
  public @ResponseBody Future<List<Role>> getRolesOfOrganization(final HttpServletRequest request,
                                                                 @PathVariable(name = "oId", required = true) final Long oId) {


    return rbacService.getPublicAndOwnRoles(oId);
  }

  @RequestMapping(value = "api/roles", method = RequestMethod.POST)
  public @ResponseBody
  ResponseEntity<RoleResponse> saveRole(@RequestBody CreateRole role)
          throws ExecutionException, InterruptedException {

    final List<Rule> newRules = new ArrayList<>(role.rules);

    final Role parent = getParent(role.parentName).get().get();
    final OrganizationImpl organization = (OrganizationImpl) getOrganization(role.organizationId);

    final Optional<Role> roleOpt = rbacService.createRole(role.name, role.systemId,
            newRules, organization, role.subjectRole, parent);

    if (!roleOpt.isPresent()) {
      return new ResponseEntity<>(new RoleResponse("Could not save role."),
              HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new ResponseEntity<>(new RoleResponse("Ok"), HttpStatus.OK);
  }

  @RequestMapping(value = "api/roles", method = RequestMethod.PUT)
  public @ResponseBody
  ResponseEntity<RoleResponse> editRole(@RequestBody EditRole role)
          throws ExecutionException, InterruptedException {

    final List<Rule> newRules = new ArrayList<>(role.rules);

    final Optional<Role> roleOpt = rbacService.editRole(role.roleId, role.name, role.subjectRole, role.parentId, newRules);

    if (!roleOpt.isPresent()) {
      return new ResponseEntity<>(new RoleResponse("Could not edit role."),
              HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<>(new RoleResponse("Ok"), HttpStatus.OK);
  }

  private Future<Optional<Role>> getParent(String parentName){
    return rbacService.getRoleByRoleName(parentName);
  }

  private Organization getOrganization(Long organizationId){
    return organizationService.getOrganizationByOrganizationId(organizationId);
  }

  private static class UserLogin implements Serializable {
    private static final long serialVersionUID = -431110191246364184L;

    public String email;
    public String password;
  }

  private static class LoginResponse implements Serializable {
    private static final long serialVersionUID = -431110191246364284L;

    public final String token;

    public LoginResponse(final String token) {
      this.token = token;
    }
  }

  private static class UserRegister implements Serializable {
    private static final long serialVersionUID = -431110191246364384L;

    public String firstname;
    public String lastname;
    public String username;
    public String email;
    public String password;
  }

  private static class RegisterResponse implements Serializable {
    private static final long serialVersionUID = -431110191246364484L;

    public final String message;

    public RegisterResponse(final String message) { this.message = message; }
  }

  private static class RegisterMailCheck implements Serializable {
    private static final long serialVersionUID = -431110191246364584L;

    public String email;
  }

  public static class CheckMailResponse implements Serializable {
    private static final long serialVersionUID = -431110191246364684L;

    public final boolean isTaken;

    public CheckMailResponse(final boolean isTaken) { this.isTaken = isTaken; }
  }

  private static class UserUpdate implements Serializable {
    private static final long serialVersionUID = -431110191246364751L;

    public String firstname;
    public String lastname;
    public String username;
    public String email;
    public String password;
    public Long organizationId;
  }

  private static class UpdateResponse implements Serializable {
    private static final long serialVersionUID = -431110191246364999L;

    public final String message;
    public final User user;

    public UpdateResponse(final String message, final User user) { this.message = message; this.user = user; }

  }

  private class RoleResponse implements Serializable {

    private static final long serialVersionUID = 6026741969342925476L;

    public final String message;


    public RoleResponse(final String message) { this.message = message;}
  }

  private static class CreateRole implements Serializable {

    private static final long serialVersionUID = 2292527772037714199L;
    public String name;
    public String systemId;
    public ArrayList<RuleImpl> rules;
    public Long organizationId;
    public Boolean subjectRole;
    public String parentName;

  }

  private static class EditRole implements Serializable {

    private static final long serialVersionUID = -845756161933655466L;

    public Long roleId;
    public String name;
    public Boolean subjectRole;
    public Long parentId;
    public ArrayList<RuleImpl> rules;

  }
}
