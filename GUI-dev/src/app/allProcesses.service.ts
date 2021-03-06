import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {AuthGuard} from "./auth-guard.service";
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";

@Injectable()
export class ProcessesService {

  restApi = window.location.protocol + '//' + window.location.hostname + ':10000/api';

  currentProcessModel;
  _userId;

  getCurrentProcessModel(): any {
    return this.currentProcessModel;
  }

  setCurrentProcessModel(processModel: any) {
    this.currentProcessModel = processModel;
  }

  constructor(private _authHttp: HttpClient, private _user: User, private authService : NbAuthService) {
    // this._user = this.authService.getToken(); ???
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      console.log("payload");
      this._userId = token.getPayload().userId;
    });
  }

   getProcessModels() {
    return this._authHttp.get(this.restApi + '/processes?page=0'); ///toStart
   }

   startProcess(pmId: number, userId: number) {
     return this._authHttp.post(this.restApi + '/processes/startProcess', {
      'pmId': pmId,
      'startUserId': userId,
      });
   }

   getAmountOfActiveProcesses() {
     return this._authHttp.get(this.restApi + '/processes/amountOfActiveProcesses')
   }

   getAmountOfActiveProcessesForUser(userId: number) {
     return this._authHttp.get(this.restApi + '/processes/amountOfActiveProcessesPerUser/' + userId);
   }

   getPossibleUsersForProcessModel(rules: string[]) {
      return this._authHttp.get(this.restApi + '/processes/users/rule/' + rules);
   }

   getProcessState(piId: number) {
       return this._authHttp.get(this.restApi + '/processes/state/' + piId);
   }

   getActiveProcesses() {
      return this._authHttp.get(this.restApi + '/processes/active?page=0');
   }

   getTerminatedProcesses() {
      return this._authHttp.get(this.restApi + '/processes/finished?page=0');
   }

   getActiveProcessesForUser(userId: number) {
     return this._authHttp.get(this.restApi + '/processes/active/' + userId + '?page=0');
   }

   getTerminatedProcessesForUser(userId: number) {
    console.log(this._user);
     return this._authHttp.get(this.restApi + '/processes/finished/' + userId + '?page=0');
   }

   getUserById(userId: number) {
      return this._authHttp.get(this.restApi + '/user/' + userId);
   }

   stopProcess(piId: number) {
      return this._authHttp.post(this.restApi + '/processes/stop/' + piId, {});
   }

   getProcessTasksForUser(userId: number) {
     return this._authHttp.get(this.restApi + '/processes/tasks/' + userId);
   }

   getTasksForProcessForUser(piId: number, userId: number) {
     return this._authHttp.get(this.restApi + '/processes/task/' + piId + '/' + userId);
   }

   submitBusinessObjectsAndNextStateAndUserAssignments(piId: number, userId:number, objectsAndStateAndUserAssignments) {
     return this._authHttp.post(this.restApi + '/processes/task/' + piId + '/' + userId, objectsAndStateAndUserAssignments);
   }

   uploadOWLModel(body) {
     return this._authHttp.post(this.restApi + '/owlprocessmodel/', body);
   }

   getRules() {
     return this._authHttp.get(this.restApi + '/rules/');
   }

  getRoles() {
    return this._authHttp.get(this.restApi + '/roles/');
  }

   getProcessesThatStartedHoursAgo(hoursBefore: number) {
     return this._authHttp.get(this.restApi + '/processes/count/started/' + hoursBefore);
   }

   getProcessesThatStartedHoursAgoForUser(hoursBefore: number, userId: number) {
     return this._authHttp.get(this.restApi + '/processes/count/started/' + hoursBefore + '/' + userId);
   }

   getProcessesThatFinishedHoursAgo(hoursBefore: number) {
     return this._authHttp.get(this.restApi + '/processes/count/finished/' + hoursBefore);
   }

   getProcessesThatFinishedHoursAgoForUser(hoursBefore: number, userId: number) {
     return this._authHttp.get(this.restApi + '/processes/count/finished/' + hoursBefore + '/' + userId);
   }

   getProcessesInState(state: string) {
     return this._authHttp.get(this.restApi + '/processes/count/' + state);
   }

   getProcessesInStateForUser(state: string, userId: number) {
     return this._authHttp.get(this.restApi + '/processes/count/' + state + '/' + userId);
   }

   importProcessModel(processModel) {
     return this._authHttp.post(this.restApi + '/import', processModel);
   }

   getPayAsYouGo(orgId: number) {
    return this._authHttp.get(this.restApi + '/processes/payasyougo/' + orgId)
   }

}
