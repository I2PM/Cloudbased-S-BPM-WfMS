import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from '../auth-guard.service';
import {ApprovalComponent} from './approval/approval.component';

import {ApprovalDetailsComponent} from './approval-details/approval-details.component';

// import {EventLoggerComponent} from './admin/components/eventLogger/eventLogger.component';
import { ProcessStoreSearchComponent } from './processstore-search/processstore-search.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {MyProcessesComponent} from './dashboard/components/myProcesses/myProcesses.component';

import { ProcessStoreDetailsComponent } from './processstore-details/processstore-details.component';
import {CreateProcessComponent} from './create-process/create-process.component';

import { ReviewProcessesComponent } from './dashboard/components/reviewProcesses/reviewProcesses.component';
import {ModalComponent} from './dashboard/components/modal/modal.component';
import {ValidatedProcessesComponent} from './dashboard/components/validatedProcesses/validatedProcesses.component';
import {CreateOrgaModalComponent} from './dashboard/components/createOrgaModal/createOrgaModal.component';

import {ApprovalAuthGuard} from '../approval-auth-guard.service';
import {AdminComponent} from "./admin";
import {adminrouting} from "./admin/admin.routing";
import {ImportProcessModel} from "./admin/components/importProcessModel";
import {UserManagementComponent} from './user-management/user-management.component';
import {OrganizationsComponent} from './user-management/components/organizations';
import {AllUsersComponent} from './user-management/components/allUsers';
import {AllRolesComponent} from './user-management/components/allRoles';
import {EditOrgaModalComponent} from './user-management/components/editOrgaModal/editOrgaModal.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      children: [{
          path: '',
          redirectTo: 'myProcesses',
          pathMatch: 'full',
        }, {
          path: 'myProcesses',
          component: MyProcessesComponent,
        }, {
          path: 'validation',
          component: ReviewProcessesComponent,

      },
        {
          path: 'validated',
          component: ValidatedProcessesComponent,
        },
        {
        path: 'modalView',
        component: ModalComponent,

      }, {
          path: 'createOrgaModalView',
          component: CreateOrgaModalComponent,

        },

      ],
    },
    {
      path: 'myprocesses',
      data: {
        menu: {
          title: 'Prozesse',
          icon: 'ion-clipboard',
          selected: false,
          expanded: false,
          order: 2,
        }
      },
      children: [
        {
          path: 'startable',
          data: {
            menu: {
              title: 'Prozess starten'
            }
          }
        },
        {
          path: 'active',
          data: {
            menu: {
              title: 'Aktive Prozesse'
            }
          }
        },
        {
          path: 'terminated',
          data: {
            menu: {
              title: 'Beendete Prozesse'
            }
          }
        }
      ]
    },
    {
      path: 'user-management',
      component: UserManagementComponent,
      canActivate: [AuthGuard],
      children: [{
        path: '',
        redirectTo: 'organizations',
        pathMatch: 'full',
      }, {
        path: 'organizations',
        component: OrganizationsComponent,
      }, {
        path: 'allUsers',
        component: AllUsersComponent,
      }, {
        path: 'allRoles',
        component: AllRolesComponent,
      },
        {
          path: 'editOrgaModalView',
          component: EditOrgaModalComponent,

        },
      ],
    },
    {
      path: 'createProcess',
      component: CreateProcessComponent,
      canActivate: [AuthGuard],

    },
    { path: 'admin',
    component: AdminComponent,
      children: [{
      path: 'import',
        component: ImportProcessModel
      }]
    },
    {
      path: 'processstore-search',
      component: ProcessStoreSearchComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'processstore-details/:processId',
      component: ProcessStoreDetailsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'approval',
      component: ApprovalComponent,
      canActivate: [ApprovalAuthGuard],
    },
    {
      path: 'approval-details/:processId',
      component: ApprovalDetailsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'user-details',
      component: UserDetailsComponent,
      canActivate: [AuthGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
