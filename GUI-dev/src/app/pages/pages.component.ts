import {Component, OnInit} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {NbAccessChecker, NbAclService, NbRoleProvider} from '@nebular/security';
import {NbMenuItem} from '@nebular/theme';
import {RoleProvider} from '../role.provider';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu: NbMenuItem[];

  constructor(private aclService: NbAclService, private roleProvider: NbRoleProvider) {
  }

  ngOnInit() {
    this.menu = [];
    this.menu.push(...MENU_ITEMS);
    this.roleProvider.getRole().subscribe(role => {
      if (this.aclService.can(role, 'create', 'approval')) {
        this.menu.push({
          title: 'Approval Page',
          icon: 'nb-checkmark',
          link: '/approval',
        });
      }
    });
  }

};
