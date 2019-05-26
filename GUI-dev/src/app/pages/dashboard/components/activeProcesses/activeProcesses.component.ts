import { Component,  OnInit } from '@angular/core';
import {ProcessesService} from '../../../../allProcesses.service';
import { Router, ActivatedRoute } from '@angular/router';
import {GatewayProvider} from "../../../../@theme/providers/backend-server/gateway";

@Component({
  selector: 'ngx-active-processes',
  styleUrls: ['activeProcesses.component.scss'],
  templateUrl:  './activeProcesses.html',
})
export class ActiveProcessesComponent implements OnInit  {

  activeProcesses: [
    {
      piId: number,
      startTime: number[],
      processName: string,
      startUserId: number,
    }
  ];
  msg = undefined;

  constructor(protected service: ProcessesService, protected  gateway:GatewayProvider, protected route: ActivatedRoute,
              protected router: Router) {

    // this.activeProcesses = [{"piId":1, "startTime": [8], "processName": "Günther", "startUserId": 12}];
  }

  ngOnInit() {
    const that = this;
    this.gateway.getUser().then( (user)=> {
      that.service.getProcessTasksForUser(user.uid)
        .subscribe(
          data => {
            that.activeProcesses = JSON.parse(data['_body']);
          },
          err => {
            that.msg = {text: err, type: 'error'}
            // console.log(err);
          },
        );
    });
  }

  showProcess(piId: number) {
    this.router.navigate(['../active', piId], { relativeTo: this.route });
  }
}
