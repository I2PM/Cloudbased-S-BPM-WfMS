import { Component } from '@angular/core';
import {StoreProcess, User} from '../../../models/models';
import {GatewayProvider} from '../../@theme/providers/backend-server/gateway';
import {NbAccessChecker} from '@nebular/security';
import {RoleProvider} from '../../role.provider';


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
  isUser: boolean;
  inOrganization: boolean;

  tabsApprover: any[] = [
    {
      title: 'My Processes',
      route: '/dashboard/myProcesses',
    },
    {
      title: 'Startable Processes',
      route: '/dashboard/startableProcesses',
    },
    {
      title: 'Processes in Approval',
      route: '/dashboard/validation',
    },
    {
      title: 'Approved Processes',
      route: '/dashboard/validated',
    },
  ];

  tabs: any[] = [
    {
      title: 'My Processes',
      route: '/dashboard/myProcesses',
    },
    {
      title: 'Startable Processes',
      route: '/dashboard/startableProcesses',
    }
  ];

  constructor(private gateway: GatewayProvider, public accessChecker: NbAccessChecker,
              private roleProvider: RoleProvider) {

    this.getFavoriteProcesses();

   }

  OnInit() {
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
         this.roleProvider.getRole().subscribe(role => this.isUser = role === 'USER' )
      })

  }




  getFavoriteProcesses() {
    this.inOrganization = false;
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
        if (user.organization !== null) {
              this.gateway.getProcessesByOrgId('' + user.organization.oid)
                .then((processes) => {
                  this.favoriteProcess = processes[0];
                  processes[1] !== undefined ? this.bestRatedProcess = processes[1] : this.bestRatedProcess = processes[0];
                })
        }
      })
  }


}
