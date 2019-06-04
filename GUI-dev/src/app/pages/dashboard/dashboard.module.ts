import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
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
    MyProcessesComponent,
    ReviewProcessesComponent,
    ValidatedProcessesComponent,
    ModalComponent,
    CreateOrgaModalComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
