import { Component,  OnInit } from '@angular/core';
import {ProcessesService} from '../../../../allProcesses.service';
import { BaThemeSpinner } from '../../../../theme/services';
import { Router, ActivatedRoute } from '@angular/router';


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
  msg = undefined;

  constructor(protected service: ProcessesService, protected spinner:BaThemeSpinner, protected route: ActivatedRoute, protected router: Router) {
    this.ngOnInit();
  }

  ngOnInit() {
    var that = this;
    //this.spinner.show();
    console.log("get terminated processes");
    this.service.getTerminatedProcessesForUser()
    .subscribe(
        data => {
          console.log(data);
          that.terminatedProcesses = JSON.parse(data['_body']);
          //that.spinner.hide();
        },
        err =>{
          that.msg = {text: err, type: 'error'}
          console.log(err);
          //that.spinner.hide();
        }
      );
  }
}
