import { Routes, RouterModule } from '@angular/router';

import { MyProcesses } from './myprocesses.component';
import { ActiveProcesses } from './components/activeProcesses/activeProcesses.component';
import { ActiveProcessDetail } from './components/activeProcessDetail/activeProcessDetail.component';
import { TerminatedProcesses } from './components/terminatedProcesses/terminatedProcesses.component';
import { StartableProcesses } from './components/startableProcesses/startableProcesses.component';
import {AuthGuard} from '../../auth-guard.service';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: MyProcesses,
    canActivate: [AuthGuard],
    children: [{
      pathMatch: 'full',
    },

      { path: 'active', component: ActiveProcesses,
        children: [
        {path: ':piId', component: ActiveProcessDetail}
      ]},
      { path: 'terminated', component: TerminatedProcesses },
      { path: 'startable', component: StartableProcesses },
      {path: 'myprocesses', component: MyProcesses}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
