import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {AuthGuard} from "./auth-guard.service";
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";

@Injectable()
export class ProcessesService {

  restApi = window.location.protocol + '//' + window.location.hostname + ':10000/api';

  currentProcessModel;

  getCurrentProcessModel(): any {
    return this.currentProcessModel;
  }

  setCurrentProcessModel(processModel: any) {
    this.currentProcessModel = processModel;
  }

  constructor(private _authHttp: HttpClient, private _user: User, private authService : NbAuthService) {
    // this._user = this.authService.getToken(); ???
    this.authService.getToken().subscribe((token) => {
      console.log("payload");
      console.log(token.getValue());
    })
  }

   getProcessModels() {
    return this._authHttp.get(this.restApi + '/processes/toStart?page=0');
   }

   startProcess(pmId: number) {
     return this._authHttp.post(this.restApi + '/processes/startProcess', {
      'pmId': pmId,
      'startUserId': this._user.getUid(),
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

   getActiveProcessesForUser() {
     return this._authHttp.get(this.restApi + '/processes/active/' + this._user.getUid() + '?page=0');
   }

   getTerminatedProcessesForUser() {
    console.log(this._user);
     return this._authHttp.get(this.restApi + '/processes/finished/' + this._user.getUid() + '?page=0');
   }

   getUserById(userId: number) {
      return this._authHttp.get(this.restApi + '/user/' + userId);
   }

   stopProcess(piId: number) {
      return this._authHttp.post(this.restApi + '/processes/stop/' + piId, {});
   }

   getProcessTasksForUser(userId?: number) {
     if (!userId) {
       userId = this._user.getUid();
     }
     return this._authHttp.get(this.restApi + '/processes/tasks/' + userId);
   }

   getTasksForProcessForUser(piId: number) {
     return this._authHttp.get(this.restApi + '/processes/task/' + piId + '/' + this._user.getUid());
   }

   submitBusinessObjectsAndNextStateAndUserAssignments(piId: number, objectsAndStateAndUserAssignments) {
     return this._authHttp.post(this.restApi + '/processes/task/' + piId + '/' + this._user.getUid(), objectsAndStateAndUserAssignments);
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

   getProcessesThatStartedHoursAgoForUser(hoursBefore: number) {
     return this._authHttp.get(this.restApi + '/processes/count/started/' + hoursBefore + '/' + this._user.getUid());
   }

   getProcessesThatFinishedHoursAgo(hoursBefore: number) {
     return this._authHttp.get(this.restApi + '/processes/count/finished/' + hoursBefore);
   }

   getProcessesThatFinishedHoursAgoForUser(hoursBefore: number) {
     return this._authHttp.get(this.restApi + '/processes/count/finished/' + hoursBefore + '/' + this._user.getUid());
   }

   getProcessesInState(state: string) {
     return this._authHttp.get(this.restApi + '/processes/count/' + state);
   }

   getProcessesInStateForUser(state: string) {
     return this._authHttp.get(this.restApi + '/processes/count/' + state + '/' + this._user.getUid());
   }

   importProcessModel(processModel) {
     return this._authHttp.post(this.restApi + '/import', processModel);
   }
}
