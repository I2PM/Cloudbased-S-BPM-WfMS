import {Component, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {ToasterService} from 'angular2-toaster';
import {Organization, Role, User} from '../../../../../models/models';

@Component({
  selector: 'ngx-add-role-to-user',
  providers: [ToasterService],
  styleUrls: ['addRoleToUser.component.scss'],
  template: `
    <div class="modal-header">
      <!-- <toaster-container></toaster-container> -->
      <span>Add new role to this user</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
      <button class="btn btn-md btn-primary" (click)="addRoleToUser()">Add</button>
    </div>
  `,
})
export class AddRoleToUserComponent {

  email = '';
  user: User = new User();
  organization: Organization = new Organization;
  saved: EventEmitter<any> = new EventEmitter();
  organizationRoles: Role[];

  constructor(private activeModal: NgbActiveModal, private gateway: GatewayProvider) {
    this.gateway.getUser()
      .then((user) => {
        if (user.organization !== null) {
          this.organization.oid = user.organization.oid;
          this.organization.organizationName = user.organization.organizationName;
          this.organization.description = user.organization.description;
        }
      }).then(this.getAllRolesByOrganization)
  }

  closeModal() {
    this.activeModal.close();
  }

  getAllRolesByOrganization = () => {
    this.gateway.getRolesOfOrganization(this.organization).then((res) => {
      this.organizationRoles = res;
      // tslint:disable-next-line
      console.log(this.organizationRoles);
    })
      .catch( (err) =>
        // tslint:disable-next-line
        console.log("sth. went wrong" + err.message)
      );
  }

  addRoleToUser = () => {

  }

}
