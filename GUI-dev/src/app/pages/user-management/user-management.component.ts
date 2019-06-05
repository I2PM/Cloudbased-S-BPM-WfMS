import {Component, OnInit} from '@angular/core';
import {StoreProcess, User} from '../../../models/models';
import {GatewayProvider} from '../../@theme/providers/backend-server/gateway';
import {NbAccessChecker, NbAclService} from '@nebular/security';
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

  constructor() {
  }


  ngOnInit() {
  }




}
