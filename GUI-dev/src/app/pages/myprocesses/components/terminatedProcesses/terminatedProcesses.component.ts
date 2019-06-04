import { Component,  OnInit } from '@angular/core';
import {ProcessesService} from '../../../../allProcesses.service';
import { BaThemeSpinner } from '../../../../theme/services';
import { Router, ActivatedRoute } from '@angular/router';
import {GatewayProvider} from "../../../../@theme/providers/backend-server/gateway";


@Component({
  selector: 'terminatedProcesses',
  styles: [],
  template:  require('./terminatedProcesses.html')
})
export class TerminatedProcesses implements OnInit  {

  terminatedProcesses:[
    {
      piId:number,
      startTime:number[],
      processName:string,
      startUserId:number
    }
  ];
  terminP;
  msg = undefined;

  constructor(protected service: ProcessesService, protected gateway:GatewayProvider,
              protected spinner:BaThemeSpinner, protected route: ActivatedRoute, protected router: Router) {
    this.ngOnInit();
  }

  ngOnInit() {
    var that = this;
    //this.spinner.show();
    console.log("get terminated processes");
    this.gateway.getUser().then((user)=> {
      that.service.getTerminatedProcessesForUser(user.uid)
        .subscribe(
          data => {
            console.log(data);
            that.terminP = data;
            that.terminatedProcesses = <any>data;
            console.log("Get Terminated Processes successfull");
            //that.spinner.hide();
          },
          err => {
            that.msg = {text: err, type: 'error'}
            console.log(err);
            //that.spinner.hide();
          }
        );
    });
  }
}
