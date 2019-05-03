import {Component} from '@angular/core';
import {StoreProcess, User} from '../../../models/models';
import {GatewayProvider} from '../../@theme/providers/backend-server/gateway';
import {NbAccessChecker} from '@nebular/security';
import {RoleProvider} from '../../role.provider';
import {RuleProvider, RuleScope, RuleType} from '../../rule.provider';


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

  constructor(private gateway: GatewayProvider, public accessChecker: NbAccessChecker,
              private ruleProvider: RuleProvider) {

    this.getFavoriteProcesses();

   }

  OnInit() {
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
        this.ruleProvider.hasRuleWithMinScope(RuleType.APPROVE_PROCESS, RuleScope.MY_ORG)
          .subscribe(canApprove => this.canApprove = canApprove);
      })

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
