import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ProcessesService} from '../../../../allProcesses.service';
import {GatewayProvider} from "../../../../@theme/providers/backend-server/gateway";
//import { ModalModule, ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'startableProcesses',
  styles: [require('./startableProcesses.scss')],
  templateUrl: './startableProcesses.html'
})
export class StartableProcesses implements OnInit {
   //@ViewChild('lgModal') public modal:ModalDirective;
   processModels = [];
   msg = undefined;
   selectedProcessModel = {name: "Kein Modell ausgewählt"};
   possibleUserAssignments = [];
   selectedUserAssignments = {};
   userSpecificProcessModels = [];
   isSelectionValid = false;
   loggedInUser;

  constructor(protected service:ProcessesService, protected gateway: GatewayProvider,
              protected route: ActivatedRoute, protected router: Router) {
    console.log("startable");

  }

  ngOnInit(): void {
    var that = this;
    this.service.getProcessModels()
      .subscribe(
         data => {
           console.log(data);
           that.processModels = (<any[]>data);
           this.gateway.getUser().then((user) => {
             const userResolved = <any> user; that.loggedInUser = userResolved}).then(() => {
             that.processModels.forEach(
             process => {
               this.service
                 .getPossibleUsersForProcessModel(process.starterSubject.assignedRoles)
                 .subscribe((userData) => {
                   const user = <any>userData;
                   user.forEach(userInstance => {
                     if (userInstance.uid === that.loggedInUser.uid) {
                       that.userSpecificProcessModels.push(process);
                       console.log("User can start the Process");
                     }
                   })
                 })
             });})
         },
         err => that.msg = {text: err, type: 'error'},
         () => console.log('Request Complete')
       );
  }

  startProcess(pmId:number):void {
    var that = this;
    this.gateway.getUser().then( (user)=>{
      that.service.startProcess(pmId, user.uid)
      .subscribe(
        data => {
          that.msg = {text: "Process started", type: 'success'};
          //this.modal.hide();
          var piId = (<any>data).piId;
          that.router.navigate(['../active', piId], { relativeTo: that.route });
        },
        err =>{
          that.msg = {text: err, type: 'error'}
          //this.modal.hide();
        },
        () => console.log("Request done")
      );
    });
  }
}
