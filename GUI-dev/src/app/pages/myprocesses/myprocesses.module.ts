import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgModel} from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { MyProcesses } from './myprocesses.component';
import { routing } from './myprocesses.routing';
import { Pipes } from '../../pipes/pipes.module';

import { ActiveProcesses } from './components/activeProcesses/activeProcesses.component';
import { ActiveProcessDetail } from './components/activeProcessDetail/activeProcessDetail.component';
import { TerminatedProcesses } from './components/terminatedProcesses/terminatedProcesses.component';
import { StartableProcesses } from './components/startableProcesses/startableProcesses.component';
import { BusinessObjects } from './components/activeProcessDetail/businessObjects.component';
import {AuthGuard} from '../../auth-guard.service';
import {BaThemeSpinner} from '../../theme/services/index';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Pipes.forRoot(),
  ],
  declarations: [
    MyProcesses,
    ActiveProcesses,
    ActiveProcessDetail,
    TerminatedProcesses,
    StartableProcesses,
    BusinessObjects
  ],
  providers: [
    AuthGuard,
    BaThemeSpinner,
    NgModel
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export default class MyProcessesModule {}



