import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
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
import {FormsModule, NgModel} from "@angular/forms";
import {NgaModule} from "../theme/nga.module";
import {ActiveProcessDetail} from "./myprocesses/components/activeProcessDetail/activeProcessDetail.component";
import {Pipes} from "../pipes/pipes.module";
import {BaAmChart} from "../theme/components/baAmChart/baAmChart.component";
import {BaCard} from "../theme/components/baCard/baCard.component";
import {NgFileSelectDirective} from "../../../node_modules/ng2-uploader/src/directives/ng-file-select";
import {NgFileDropDirective} from "../../../node_modules/ng2-uploader/src/directives/ng-file-drop";
import {BaCheckbox} from "../theme/components/baCheckbox";
import { TypeaheadContainerComponent} from "ngx-bootstrap";
import {ModalModule} from 'ngb-modal';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    HomeModule,
    ApprovalModule,
    ApprovalDetailsModule,
    AdminModule,
    ModalModule,
    UserDetailsModule,
    ProcessStoreSearchModule,
    ProcessRatingModule,
    ProcessstoreDetailsModule,
    CreateProcessModule,
    UserManagementModule,
    FormsModule,
    Pipes.forRoot(),
  ],
  declarations: [
    //StartableProcesses,
    //TerminatedProcesses,
    //ActiveProcesses,
    //ActiveProcessDetail,
	  //TypeaheadContainerComponent,
	  PagesComponent,
	  NgFileSelectDirective,
	  NgFileDropDirective,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class PagesModule {
}
