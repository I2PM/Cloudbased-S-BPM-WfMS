import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { routing } from './admin.routing';

import { ActiveProcessesComponent } from './components/activeProcesses/activeProcesses.component';
// import { ImportProcessModelComponent } from '../importProcessModel/importProcessModel.component';
import { TerminatedProcessesComponent } from './components/terminatedProcesses/terminatedProcesses.component';
import { ProcessModelsComponent } from './components/processModels/processModels.component';
import { EventLoggerComponent } from './components/eventLogger/eventLogger.component';
import { ManipulatePNMLComponent } from './components/manipulatePNML/manipulatePNML.component';
import { GenerateOWLComponent } from './components/generateOWL/generateOWL.component';
import { AuthGuard } from '../../auth-guard.service';
import { ThemeModule } from '../../@theme/theme.module';
import { PayAsYouGoComponent } from './components/pay-as-you-go/pay-as-you-go.component';
import { Pipes } from '../../pipes/pipes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    ThemeModule,
    Pipes.forRoot(),
  ],
  declarations: [
    AdminComponent,
    ActiveProcessesComponent,
    TerminatedProcessesComponent,
    ProcessModelsComponent,
    EventLoggerComponent,
    ManipulatePNMLComponent,
    GenerateOWLComponent,
    PayAsYouGoComponent,
  ],
  providers: [
    AuthGuard,
  ],
})
export default class AdminModule {}
