import {Component, OnInit} from '@angular/core';
import {StoreProcess, User} from '../../../models/models';
import {GatewayProvider} from '../../@theme/providers/backend-server/gateway';
import {NbAccessChecker} from '@nebular/security';
import {RoleProvider} from '../../role.provider';
import {ProcessesService} from '../../allProcesses.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['dashboard.component.scss'],
  providers: [RoleProvider],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  favoriteProcess: StoreProcess = new StoreProcess();
  bestRatedProcess: StoreProcess = new StoreProcess();
  tabName: any[];
  user: User;
  canApprove: boolean;
  inOrganization: boolean;

  tabsApprover: any[] = [
    {
      title: 'All Company Processes',
      route: '/dashboard/myProcesses',
    },
    {
      title: 'Company Processes in Approval',
      route: '/dashboard/validation',
    },
    {
      title: 'Approved Company Processes (in Store)',
      route: '/dashboard/validated',
    },
  ];

  tabs: any[] = [
    {
      title: 'My Processes',
      route: '/dashboard/myProcesses',
    },
  ];

  activeProcesses;
  finishedProcesses;
  activeProcesses24Hours;
  finishedProcesses24Hours;

  constructor(private gateway: GatewayProvider, public accessChecker: NbAccessChecker, private _processService:ProcessesService) {

    this.getFavoriteProcesses();
    this.OnInit();
  }

  OnInit() {
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
      });
    var that = this;
    this._processService.getProcessesInState("active")
      .subscribe(
        data => {
          that.activeProcesses = data;
        },
        err =>{
          console.log(err);
        }
      );
    this._processService.getProcessesInState("finished")
      .subscribe(
        data => {
          that.finishedProcesses = data;
        },
        err =>{
          console.log(err);
        }
      );
    this._processService.getProcessesThatStartedHoursAgo(24)
      .subscribe(
        data => {
          that.activeProcesses24Hours = data;
        },
        err =>{
          console.log(err);
        }
      );
    this._processService.getProcessesThatFinishedHoursAgo(24)
      .subscribe(
        data => {
          that.finishedProcesses24Hours = data;
        },
        err =>{
          console.log(err);
        }
      );

  }

  getFavoriteProcesses() {
    this.inOrganization = false;
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
        if (user.organization !== null) {
          this.gateway.getProcessesByOrgId('' + user.organization.oid)
          // TODO: favouriteProcess automatisch 0 und bestRated 1?? dafuq
            .then((processes) => {
              this.favoriteProcess = processes[0];
              processes[1] !== undefined ? this.bestRatedProcess = processes[1] : this.bestRatedProcess = processes[0];
            })
        }
      })
  }


}
