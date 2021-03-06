import 'rxjs/add/operator/switchMap';
import { Component,  OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaThemeSpinner } from '../../../../theme/services';
import {ProcessesService} from '../../../../allProcesses.service';
import {User} from '../../../../../models/models';
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";
import {GatewayProvider} from "../../../../@theme/providers/backend-server/gateway";

type businessObject = {
  bomId:number,
  boiId:number,
  name:string,
  fields:[{
    bofmId:number,
    bofiId:number,
    name:string,
    type:string,
    required:boolean,
    readonly:boolean,
    value:any
  }],
  children:[businessObject];
}

@Component({
  selector: 'activeProcessDetail',
    styles: [require('./activeProcessDetail.scss')],
  template:  require('./activeProcessDetail.html'),
  providers: [User]
})
export class ActiveProcessDetail implements OnInit {

  piId:number;
  msg = undefined;
  subjectsState:{
    piId:number,
    status: string,
    startTime: number[],
    endTime: number[],
    subjects: [{
      ssId: number,
      userId: number,
      subjectName: string,
      stateName: string,
      stateFunctionType: string,
      subState: string,
      lastChanged: number[],
      user: any
    }]
  };
  businessObjects:businessObject[];
  nextStates:[{
    name:string,
    nextStateId:number,
    endState:boolean
  }];
  assignedUsers:[{
    smId:number,
    userId:number,
    assignedRoles:string[],
    subjectName:string
  }];
  possibleUserAssignments = [];
  selectedUserAssignments = [];
  nextIsEndState = false;
  isFinished = false;
  myCurrentState;
  _userId;

  constructor(protected service: ProcessesService, protected gateway:GatewayProvider, protected spinner:BaThemeSpinner,
              protected route: ActivatedRoute, protected router: Router, private _user:User, private authService: NbAuthService) {
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      console.log("payload");
      this._userId = token.getPayload().userId;
    });
  }

  ngOnInit() {

    var that = this;
    this.piId = +this.route.snapshot.params['piId'];
    this.businessObjects = undefined;
    this.nextStates = undefined;
    //this.spinner.show();
    if(!this.nextIsEndState){
      that.assignedUsers = undefined;
      this.service.getProcessState(this.piId)
      .subscribe(
          data => {
            console.log("process state: "+JSON.stringify(data));
            that.subjectsState = (<any>data);
            that.myCurrentState = that.subjectsState.subjects.filter(s => s.userId === that._userId)[0].stateName;
            //that.spinner.hide();
          },
          err =>{
            that.msg = {text: err, type: 'error'}
            console.log(err);
            //that.spinner.hide();
          }
        );

      this.gateway.getUser().then((user)=> {
        that.service.getTasksForProcessForUser(this.piId, user.uid)
          .subscribe(
            data => {

              console.log('response of getTasksForProcessForUser:' + data);

              var dataJson;
              try {
                dataJson = (<any>data);
              } catch (e) {
                return false;
              }
              that.businessObjects = dataJson.businessObjects;

              that.businessObjects = that.formatDateValuesOfBusinessObjects(that.businessObjects)

              /*
              for(let i = 0; i < that.businessObjects.length; i++)
              {
                  for(let j=0; j< that.businessObjects[i].fields.length; j++)
                  {
                    if(that.businessObjects[i].fields[j].type==="DATE" && that.businessObjects[i].fields[j].value!==null)
                    {
                      console.log("converting date!");
                      let extendedMillisecondString = that.businessObjects[i].fields[j].value+"000";
                      console.log("extended millisecond value: "+extendedMillisecondString);
                      var extendedMillisecondNumber = Number(extendedMillisecondString)
                      let d = new Date(extendedMillisecondNumber);
                      console.log('Date format: ' + d);
                      //new Date().toString('yyyy-MM-d-h-mm-ss');
                      //let date = new Date().toString('yyyy-MM-d-h-mm-ss');

                      var dateFormat = require('dateformat');
                      //let format = dateFormat(d, "yyyy-MM-dd");

                      //console.log(format);

                      var month = dateFormat(d .getMonth() + 1);

                      var day = dateFormat(d .getDate());

                      var year = dateFormat(d .getFullYear());

                      let formattedString= year+"-"+ month+ "-" + day;

                      let formatted_date = d.getFullYear() + "-" + this.appendLeadingZeroes(d.getMonth() + 1) + "-" + this.appendLeadingZeroes(d.getDate());
                      //that.businessObjects[i].fields[j].type="STRING";

                      that.businessObjects[i].fields[j].value = formatted_date;
                    }
                  }
              }
*/
              console.log('Business Objects: '+JSON.stringify(that.businessObjects));

              that.nextStates = dataJson.nextStates;
              that.assignedUsers = dataJson.assignedUsers;
              if (that.assignedUsers) {
                that.getPossibleUserAssignments();
              }
            },
            err => {
              that.msg = {text: err, type: 'error'}
              console.log(err);
            }
          );
      });
      } else {

      this.service.getTerminatedProcesses().subscribe( (data)=> {
        let terminatedProcessesList = <any[]>data;
        let currentTerminatedProcess;
        for (let i = 0; i < terminatedProcessesList.length; i++) {
          if (terminatedProcessesList[i].piId === this.piId) {
            currentTerminatedProcess = terminatedProcessesList[i];
            break;
          }
        }

        if (currentTerminatedProcess !== undefined)
          this.gateway.updateEndTimeOfPayEntry(this.piId, currentTerminatedProcess);

      });
      console.log("THIS SHIT IS FINISHED!");
      this.isFinished = true;


        //this.spinner.hide();
      }
  }

  formatDateValuesOfBusinessObjects(businessObjects: any[])
  {
    for(let i = 0; i < businessObjects.length; i++)
    {
      for(let j=0; j< businessObjects[i].fields.length; j++)
      {
        if(businessObjects[i].fields[j].type==="DATE" && businessObjects[i].fields[j].value!==null)
        {
          console.log("converting date!");
          let extendedMillisecondString = businessObjects[i].fields[j].value+"000";
          console.log("extended millisecond value: "+extendedMillisecondString);
          var extendedMillisecondNumber = Number(extendedMillisecondString)
          let d = new Date(extendedMillisecondNumber);
          console.log('Date format: ' + d);

          let formatted_date = d.getFullYear() + "-" + this.appendLeadingZeroes(d.getMonth() + 1) + "-" + this.appendLeadingZeroes(d.getDate());
          businessObjects[i].fields[j].value = formatted_date;
        }
      }
    }

    return businessObjects;
  }

   appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }

  getPossibleUserAssignments() {
    var that = this;
    this.assignedUsers.forEach(
      au => {
        if(!au.userId){
          that.service.getPossibleUsersForProcessModel(au.assignedRoles).
          subscribe(
            data => {
              let users = (<any>data);
              au.assignedRoles.forEach(role => {
                that.possibleUserAssignments.push({role: role, smId: au.smId, users: users, subjectName: au.subjectName});
                that.selectedUserAssignments[role] = undefined;
              });
            },
            err =>{
              this.msg = {text: err, type: 'error'}
              that.possibleUserAssignments = [];
            },
            () => console.log("Request done")
          );
        }
      });
  }

  submitForm(form) {
    var that = this;
    var businessObjectsValues = [];
    var userAssignments = [];
    that.nextIsEndState = that.nextStates.filter(ns => ns.nextStateId === form.nextStateId)[0].endState;

    console.log("next is endstate: "+that.nextIsEndState);

    if(this.isSendState()){
      var keys = Object.keys(form.value).forEach(k => {
        var kSplit = k.split("User-Assignment_:-");
        if(kSplit.length > 1){
          var value = form.value[k];
          userAssignments.push({smId:value.smId, userId:value.userId});
        }
      });
    }

    this.businessObjects.forEach(bo => {
      businessObjectsValues.push(this.getBusinessObjectsValues(bo, form));
    });
    var businessObjectsAndNextStateAndUserAssignments = {
      nextStateId: form.nextStateId,
      businessObjects: businessObjectsValues,
      userAssignments: userAssignments
    };

    this.submitStateChange(businessObjectsAndNextStateAndUserAssignments);

  }

  private getBusinessObjectsValues(bo:businessObject, form): any{
    var fields = []
    var childBoValues = [];
    var keys = Object.keys(form.value).forEach(k => {
      var kSplit = k.split("-:_");
      if(kSplit.length > 1) {
        var bomId = kSplit[0];
        var bofmId = kSplit[1];
        if(bomId === (bo.bomId).toString()) {
          var value = form.value[k];
          fields.push({bofmId:bofmId, value:value});
        }
      }
    });
    bo.children.forEach(childBo => {
      childBoValues.push(this.getBusinessObjectsValues(childBo, form))}
    );
    return {bomId:bo.bomId, fields:fields, children:childBoValues};
  }

  private submitStateChange(businessObjectsAndNextStateAndUserAssignments) {
    var that = this;
    console.log('businessObjectsAndNextStateAndUserAssignments: ' + JSON.stringify(businessObjectsAndNextStateAndUserAssignments));
    this.gateway.getUser().then( (user)=> {
      that.service.submitBusinessObjectsAndNextStateAndUserAssignments(this.piId,user.uid, businessObjectsAndNextStateAndUserAssignments)
        .subscribe(
          data => {
            that.ngOnInit();
          },
          err => {
            that.msg = {text: err, type: 'error'}
            console.log(err);
          }
        );
    });
  }

  //dirty hack so that the value of the checkbox changes (otherwise the form submit value will stay the original value)
  onChangeCheckboxFn(that, element){
    var name = element.name.split("-:_")[0];
    that.model._parent.form.controls[name].setValue(element.checked)
  }

  isReceiveState(){
    //onsole.log(this._user);
    //console.log(this.subjectsState);
    if(this.subjectsState){
      return this.subjectsState.subjects.filter(s => s.userId === this._userId)[0].stateFunctionType === "RECEIVE";
    } else {
      return false;
    }
  }

  isToReceiveState(){
    if(this.subjectsState){
      return this.subjectsState.subjects.filter(s => s.userId === this._userId)[0].subState === "TO_RECEIVE";
    } else {
      return false;
    }
  }

  isReceivedState(){
    if(this.subjectsState){
      return this.subjectsState.subjects.filter(s => s.userId === this._userId)[0].subState === "RECEIVED";
    } else {
      return false;
    }
  }

  isSendState(){
    if(this.subjectsState){
      return this.subjectsState.subjects.filter(s => s.userId === this._userId)[0].stateFunctionType === "SEND";
    } else {
      return false;
    }
  }
}
