import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServerConfigProvider} from './serverconfig';
import {User, StoreProcess, StoreProcessRating, Organization, AverageRating, Role, Rule} from '../../../../models/models';
import {toPromise} from "rxjs/operator/toPromise";
import {start} from "repl";

@Injectable()
export class GatewayProvider {

  constructor(public http: HttpClient, public serverConfig: ServerConfigProvider) {
  }
  /**
   * EXAMPLE: Here we can define all methods which are connecting the frontend to the backend
   * i.e. => getAllProcesses or saveNewProcess or searchForProcess etc...
   */
  /*getAllProcesses = (): Promise<Array<any>> =>
    this.http.get<Array<any>>(null, {})
      .toPromise()
      .then(processes => processes);
  */

  // gets the current user
  getUser(): Promise<User> {
    return this.http.get<User>(this.serverConfig.getUser)
      .toPromise()
  }

  addUserToOrganisation(user: User): Promise<User> {
    return this.http.put<User>(this.serverConfig.addUserToOrg + '/' + user.uid + '/addUserToOrg/' + user.organization.oid, {})
      .toPromise();
  }

  createRole(role: Role): Promise<Role> {
    return this.http.post<Role>(this.serverConfig.createRole,
      {
        'name': role.name,
        'systemId': role.systemId,
        'rules': role.rules,
        'organizationId': role.organization.oid,
        'subjectRole': role.subjectRole,
        'parentName': role.parent.name,
      })
      .toPromise();
  }

  editRole(role: Role): Promise<Role> {
    return this.http.put<Role>(this.serverConfig.editRole,
      {
        'roleId': role.roleId,
        'name': role.name,
        'subjectRole': role.subjectRole,
        'parentId': role.parent.roleId,
        'rules': role.rules,
      })
      .toPromise();
  }

  addRoleToUser(user: number, role: Role): Promise<Role> {
    return this.http.post<Role>(this.serverConfig.addRoleToUser + '/addRoleToUser/' + user + '/' + role.roleId,
      {})
      .toPromise();
  }
  deleteRole(roleId: number): Promise<any> {
    return this.http.delete<any>(this.serverConfig.deleteRole + '/' + roleId,
      {})
      .toPromise();
  }

  createProcess(process: StoreProcess): Promise<StoreProcess> {
    return this.http.post<StoreProcess>(this.serverConfig.createProcess, process).toPromise()
  }

  mapProcessModelToProcess(processStoreId: number, processModelId, orgaId: number) {
    return this.http.post<any>(this.serverConfig.mapProcessModelIdToProcessStoreId + '/' + processStoreId
      + '/with/' + processModelId + '/of/' + orgaId, undefined).toPromise();
  }

  uploadOWLModel(processId: number, owlFile: File): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();
    formData.append('file', owlFile);
    return this.http.post<any>(this.serverConfig.uploadOWL + processId + '/uploadProcessFile', formData, {'headers': headers}).toPromise()
  }

  getApprovedProcessesByUser(): Promise<StoreProcess[]> {
    return this.http.get<StoreProcess[]>(this.serverConfig.getApprovedProcessesByUser)
      .toPromise()
  }

  getNotApprovedProcessesByUser(): Promise<StoreProcess[]> {
    return this.http.get<StoreProcess[]>(this.serverConfig.getNotApprovedProcessesByUser)
      .toPromise()
  }

  createNewOrganisation(organization: Organization): Promise<Organization> {
    return this.http.post<Organization>(this.serverConfig.createOrganization,
      {'organizationName': organization.organizationName, 'organizationDescription': organization.description})
      .toPromise();
  }


  editOrganisation(organization: Organization): Promise<Organization> {
    return this.http.put<Organization>(this.serverConfig.editOrganization + '/' + organization.oid,
      {'organizationName': organization.organizationName, 'organizationDescription': organization.description})
      .toPromise();
  }

  getRolesOfOrganization(organization: Organization): Promise<Role[]> {
    return this.http.get<Role[]>(this.serverConfig.getRolesOfOrganization + '/' + organization.oid + '/roles')
      .toPromise()
  }

  getAllRules(): Promise<Rule[]> {
    return this.http.get<Rule[]>(this.serverConfig.getRules)
      .toPromise()
  }

  getAllRoles(): Promise<Role[]> {
    return this.http.get<Role[]>(this.serverConfig.getRoles)
      .toPromise()
  }

  getPublicAndOwnRoles(organization: Organization): Promise<Role[]> {
    return this.http.get<Role[]>(this.serverConfig.getPublicAndOwnRoles + '/' + organization.oid)
      .toPromise()
  }

  getUsersOfMyOrg(): Promise<User[]> {
    return this.http.get<User[]>(this.serverConfig.getUsersOfMyOrg).toPromise();
  }

  getStoreProcesses(): Promise<StoreProcess[]> {
    return this.http.get<StoreProcess[]>(this.serverConfig.getStoreProcesses)
      .toPromise()
  }

  getUserByEmail(email: String): Promise<User> {
    return this.http.get<User>(this.serverConfig.getUserByEmail + '/' + email + '/getUserData')
      .toPromise()
  }

  getStoreProcessRatings(processId: number): Promise<StoreProcessRating[]> {
    return this.http.get<StoreProcessRating[]>(this.serverConfig.getStoreProcessRatings + '/' + processId)
      .toPromise()
  }

  postStoreProcessRatings(processId: number, rating: StoreProcessRating): void {
    const url = this.serverConfig.postStoreProcessRating + '/' + processId + '/add';
    this.http.post<StoreProcessRating>(url, rating).toPromise()
  }

  getUnapprovedStoreProcesses(): Promise<StoreProcess[]> {
    return this.http.get<StoreProcess[]>(this.serverConfig.getUnapprovedStoreProcesses)
      .toPromise()
  }

  getApprovedStoreProcesses(): Promise<StoreProcess[]> {
    return this.http.get<StoreProcess[]>(this.serverConfig.getApprovedProcesses)
      .toPromise()
  }

  postStoreProcessApproved(processId: string): void {
    const url = this.serverConfig.postStoreProcessApproved + '/' + processId + '/approve';
    this.http.post<StoreProcess>(url, processId).toPromise()
  }

  postStoreProcessUnapproved(processId: string): void {
    const url = this.serverConfig.postStoreProcessUnapproved + '/' + processId + '/unapprove';
    this.http.post<StoreProcess>(url, processId).toPromise()
  }

  getStoreProcessById(processId: string): Promise<StoreProcess> {
    const url = this.serverConfig.getStoreProcessById + '/' + processId;
    return this.http.get<StoreProcess>(url)
      .toPromise()
  }

  postStoreProcessComment(comment: string, processId: string): void {
    const url = this.serverConfig.postStoreProcessApproved + '/' + processId + '/updateApprovalComment';
    this.http.post<StoreProcess>(url, comment).toPromise()
  }

  // gets a process by its Id
  getProcessById(processId: string): Promise<StoreProcess> {
    return this.http.get<StoreProcess>(this.serverConfig.getProcess + processId)
      .toPromise()
  }

  // gets the processfile by its processId
  getProcessFileById (processId: string): Promise<Blob> {
    const promise = this.http.get(this.serverConfig.getProcessFile + processId + '/getProcessFile',  { responseType: 'blob' }).toPromise();
    return promise;
  }

  // adds a process to an organization
  addProcessToOrganization(processId: string, orgId: string, uid: string): Promise<StoreProcess> {
    return this.http.post<StoreProcess>(this.serverConfig.getProcess + processId + '/buy',
      {'orgaId': orgId, 'userId': uid})
      .toPromise()
  }

  // get all processes of an organization
  getProcessesByOrgId(orgId: string): Promise<StoreProcess[]> {
    return this.http.get<StoreProcess[]>(this.serverConfig.getOrgProcesses + orgId)
      .toPromise()
  }

  getAverageRating(processId: number): Promise<AverageRating> {
    const url = this.serverConfig.getAverageRating + '/' + processId + '/getAverageAndCount';
    return this.http.get<AverageRating>(url).toPromise()
  }


  getPayAsYouGo(orgId: number): Promise<any[]>
  {
    const url = this.serverConfig.getPayAsYouGo + orgId;
    return this.http.get<any[]>(url).toPromise()
  }

  addPayAsYouGoEntryForProcessInstance(processInstanceId:number, process, organisation: Organization) {
    const startTime = process.startTime[0] + '-' + process.startTime[1] + '-' + process.startTime[2] + ' ' +
      process.startTime[3] + ':' + process.startTime[4] + ':' + process.startTime[5];

    var d = new Date(startTime);
    var startTimeMilliseconds = d.getTime();

    console.log('date: ' + d);m
    console.log('milliseconds: ' + startTimeMilliseconds);

    const processName = process.processName;
    const oId = organisation.oid;
    const rate = 0.1*10000;

    const url = this.serverConfig.addPayAsYouGo + processInstanceId + '/with/' + processName + '/from/' + oId +
      '/startedAt/' + startTimeMilliseconds + '/and/' + rate;

    console.log('startTime: ' + startTime);
    console.log('processName: ' + processName);
    console.log('oId: ' + oId);
    console.log('rate: ' + rate);
    console.log('processInstanceId: ' + processInstanceId);
    console.log(url);

    return this.http.post<any>(url, undefined).toPromise();
  }

  updateEndTimeOfPayEntry(processInstanceId:number, process) {
    const endtime = process.endTime[0] + '-' + process.endTime[1] + '-' + process.endTime[2] + ' ' +
      process.endTime[3] + ':' + process.endTime[4] + ':' + process.endTime[5];

    var d = new Date(endtime);
    var endTimeMilliseconds = d.getTime();

    console.log('date: ' + d);
    console.log('milliseconds: ' + endTimeMilliseconds);

    const url = this.serverConfig.updatePayAsYouGoEntry + processInstanceId + '/with/' + endTimeMilliseconds;

    console.log('endtime: ' + endTimeMilliseconds);
    console.log('processInstanceId: ' + processInstanceId);
    console.log(url);

    return this.http.post<any>(url, undefined).toPromise();
  }

}
