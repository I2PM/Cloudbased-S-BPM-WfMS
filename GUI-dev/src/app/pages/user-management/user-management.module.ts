import {NgModule} from '@angular/core';


import {ThemeModule} from '../../@theme/theme.module';
import {BusinessObjectsComponent} from './components/activeProcessDetail/businessObjects.component';
import {StartableProcessesComponent} from './components/startableProcesses/startableProcesses.component';
import {TerminatedProcessesComponent} from './components/terminatedProcesses/terminatedProcesses.component';
import {ActiveProcessDetailComponent} from './components/activeProcessDetail/activeProcessDetail.component';
import {ActiveProcessesComponent} from './components/activeProcesses/activeProcesses.component';
import {FormsModule} from '@angular/forms';
import {ReviewProcessesComponent} from './components/reviewProcesses/reviewProcesses.component';
import {ModalComponent} from './components/modal/modal.component';
import {ValidatedProcessesComponent} from './components/validatedProcesses/validatedProcesses.component';
import {CreateOrgaModalComponent} from './components/createOrgaModal/createOrgaModal.component';
import {ToasterModule} from 'angular2-toaster';
import {UserDetailsComponent} from '../user-details/user-details.component';
import {UserManagementComponent} from './user-management.component';
import {OrganizationsComponent} from './components/organizations';
import {AllUsersComponent} from './components/allUsers';
import {AllRolesComponent} from './components/allRoles';
import {EditOrgaModalComponent} from './components/editOrgaModal/editOrgaModal.component';


@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ToasterModule,
  ],
  declarations: [
    UserManagementComponent,
    ActiveProcessesComponent,
    ActiveProcessDetailComponent,
    TerminatedProcessesComponent,
    StartableProcessesComponent,
    BusinessObjectsComponent,
    ReviewProcessesComponent,
    ValidatedProcessesComponent,
    ModalComponent,
    CreateOrgaModalComponent,
    EditOrgaModalComponent,
    OrganizationsComponent,
    AllUsersComponent,
    AllRolesComponent,
  ],
})
export class UserManagementModule {
}
