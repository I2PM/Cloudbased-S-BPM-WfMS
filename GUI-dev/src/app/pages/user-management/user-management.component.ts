import {Component, OnInit} from '@angular/core';
import {StoreProcess, User} from '../../../models/models';
import {GatewayProvider} from '../../@theme/providers/backend-server/gateway';
import {NbAccessChecker} from '@nebular/security';
import {RoleProvider} from '../../role.provider';

@Component({
  selector: 'ngx-user-management',
  styleUrls: ['user-management.component.scss'],
  providers: [RoleProvider],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {

  favoriteProcess: StoreProcess = new StoreProcess();
  bestRatedProcess: StoreProcess = new StoreProcess();
  tabName: any[];
  user: User;

  inOrganization: boolean;

  tabsAdmin: any[] = [
    {
      title: 'Organizations',
      route: '/user-management/organizations',
    },
    {
      title: 'User Management',
      route: '/user-management/allUsers',
    },
    {
      title: 'Role Management',
      route: '/user-management/allRoles',
    },
  ];

  tabs: any[] = [
    {
      title: 'My Organization',
      route: '/user-management/myOrganization',
    },
    {
      title: 'User Management',
      route: '/user-management/myUsers',
    },
  ];

  constructor(private gateway: GatewayProvider, public accessChecker: NbAccessChecker,
              private roleProvider: RoleProvider) {
  }

  /*
  OnInit() {
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
        */
  /*this.ruleProvider.getRules().subscribe(rules => {
    this.showAllOrganizations = rules.indexOf(RuleProvider.RULES.EDIT_ALL_ORGS) >= 0;
    this.showMyOrganizations = rules.indexOf(RuleProvider.RULES.EDIT_MY_ORG) >= 0;
    this.showAllUsers = rules.indexOf(RuleProvider.RULES.EDIT_ALL_USER_ROLES) >= 0;
    this.showMyEmps = rules.indexOf(RuleProvider.RULES.EDIT_ORG_USER_ROLES) >= 0;
    this.showRoles = rules.indexOf(RuleProvider.RULES.EDIT_ROLES) >= 0;
  })*/

  /*
        this.ruleInfo = this.ruleProvider.getRuleInfo()
      })

  }
  */
  ngOnInit() {
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
      })

  }

  /*
  initializeTabs(ruleInfo: RuleInfo) {

    RuleScope[ruleInfo.edit_organisations] = [

      {
        title: 'Organizations',
        route: '/user-management/organizations'
      }
    ,
      {
        title: 'User Management',
        route: '/user-management/allUsers'
      }
    ,
      {
        title: 'Role Management',
        route: '/user-management/allRoles'
      }
    ];

    tabs: any[] = [
      {
        title: 'My Organization',
        route: '/user-management/myOrganization',
      },
      {
        title: 'User Management',
        route: '/user-management/myUsers',
      }
    ]
  }
  */


}
