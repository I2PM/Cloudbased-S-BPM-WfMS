import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {HomeModule} from './home/home.module';
import { ProcessStoreSearchModule } from './processstore-search/processstore-search.module';
import {ApprovalModule} from './approval/approval.module';
import {ApprovalDetailsModule} from './approval-details/approval-details.module';
import {AdminModule} from './admin/admin.module';
import {UserDetailsModule} from './user-details/user-details.module';
import { ProcessRatingModule } from './includes/process-ratings/process-ratings.module';
import { ProcessstoreDetailsModule } from './processstore-details/processstore-details.module';
import {CreateProcessModule} from './create-process/create-process.module';
import {UserManagementModule} from './user-management/user-management.module';
import MyProcessesModule from "./myprocesses/myprocesses.module";
import {MyProcesses} from "./myprocesses";
import {StartableProcesses} from "./myprocesses/components/startableProcesses";
import {TerminatedProcesses} from "./myprocesses/components/terminatedProcesses";
import {ActiveProcesses} from "./myprocesses/components/activeProcesses/activeProcesses.component";
import {FormsModule} from "@angular/forms";
import {NgaModule} from "../theme/nga.module";
import {ActiveProcessDetail} from "./myprocesses/components/activeProcessDetail/activeProcessDetail.component";


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    HomeModule,
    ApprovalModule,
    ApprovalDetailsModule,
    AdminModule,
    UserDetailsModule,
    ProcessStoreSearchModule,
    ProcessRatingModule,
    ProcessstoreDetailsModule,
    CreateProcessModule,
    UserManagementModule,
    FormsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    MyProcesses,
    StartableProcesses,
    TerminatedProcesses,
    ActiveProcesses,
    ActiveProcessDetail,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule {
}
