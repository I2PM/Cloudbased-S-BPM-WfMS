import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import {BusinessObjectsComponent} from './components/activeProcessDetail/businessObjects.component';
import {StartableProcessesComponent} from './components/startableProcesses/startableProcesses.component';
import {TerminatedProcessesComponent} from './components/terminatedProcesses/terminatedProcesses.component';
import {ActiveProcessDetailComponent} from './components/activeProcessDetail/activeProcessDetail.component';
import { ActiveProcessesComponent} from './components/activeProcesses/activeProcesses.component';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard.component';
import {ReviewProcessesComponent} from './components/reviewProcesses/reviewProcesses.component';
import {ModalComponent} from './components/modal/modal.component';
import {ValidatedProcessesComponent} from './components/validatedProcesses/validatedProcesses.component';
import {CreateOrgaModalComponent} from './components/createOrgaModal/createOrgaModal.component';
import {ToasterModule} from 'angular2-toaster';
import {MyProcessesComponent} from "./components/myProcesses";




@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ToasterModule,
  ],
  declarations: [
    DashboardComponent,
    ActiveProcessesComponent,
    ActiveProcessDetailComponent,
    MyProcessesComponent,
    TerminatedProcessesComponent,
    StartableProcessesComponent,
    BusinessObjectsComponent,
    ReviewProcessesComponent,
    ValidatedProcessesComponent,
    ModalComponent,
    CreateOrgaModalComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
