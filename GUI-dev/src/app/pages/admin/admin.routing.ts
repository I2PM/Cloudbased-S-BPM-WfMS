import { Routes, RouterModule }  from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { Admin } from './admin.component';
import { ActiveProcesses } from './components/activeProcesses/activeProcesses.component';
import { TerminatedProcesses } from './components/terminatedProcesses/terminatedProcesses.component';
import { ProcessModels } from './components/processModels/processModels.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Admin,
    canActivate: [AuthGuard],
    children: [
      { path: 'active', component: ActiveProcesses },
      { path: 'terminated', component: TerminatedProcesses },
      { path: 'models', component: ProcessModels }
    ]
  }
];

export const routing = RouterModule.forChild(routes);