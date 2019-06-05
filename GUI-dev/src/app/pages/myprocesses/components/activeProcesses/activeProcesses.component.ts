import { Component,  OnInit } from '@angular/core';
import { BaThemeSpinner } from '../../../../theme/services';
import { Router, ActivatedRoute } from '@angular/router';
import {ProcessesService} from '../../../../allProcesses.service';
import {GatewayProvider} from "../../../../@theme/providers/backend-server/gateway";

@Component({
  selector: 'activeProcesses',
  styles: [],
  templateUrl: './activeProcesses.html'
})
export class ActiveProcesses implements OnInit  {

  activeProcesses:[
    {
      piId:number,
      startTime:number[],
      processName:string,
      startUserId:number
    }
  ];
  msg = undefined;

  constructor(protected service: ProcessesService, protected gateway:GatewayProvider, protected spinner:BaThemeSpinner,
              protected route: ActivatedRoute, protected router: Router) {
  }

  ngOnInit() {
    var that = this;
    //this.spinner.show()
    this.gateway.getUser().then((user)=> {
      that.service.getProcessTasksForUser(user.uid)
        .subscribe(
          data => {
            that.activeProcesses = (<any>data);
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

  showProcess(piId:number){
    console.log(piId);
    this.router.navigate(['../active', piId], { relativeTo: this.route });
  }
}
