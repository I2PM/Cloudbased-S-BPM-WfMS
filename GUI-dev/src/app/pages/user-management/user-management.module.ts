import {NgModule} from '@angular/core';


import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule} from '@angular/forms';
import {ModalComponent} from './components/modal/modal.component';
import {CreateOrgaModalComponent} from './components/createOrgaModal/createOrgaModal.component';
import {ToasterModule} from 'angular2-toaster';
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
