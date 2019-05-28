import {Component, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {ToasterService} from 'angular2-toaster';
import {Organization, User} from '../../../../../models/models';

@Component({
  selector: 'ngx-add-role-to-organization',
  providers: [ToasterService],
  styleUrls: ['addRoleToOrganization.component.scss'],
  template: `
    <div class="modal-header">
      <!-- <toaster-container></toaster-container> -->
      <span>Add new role to this organization</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div  class="flex-column text-body">
      <div class="form-group">
        <br>
        <h6>Role Name</h6>
        <input name="roleName"  id="input-role" [(ngModel)]="role"
               class="form-control" placeholder="Role Name" #roleName="ngModel"
        >
      </div>
    </div>
    <div  class="flex-column text-body">
      <div class="form-group">
        <br>
        <h6>Process Rules</h6>
        <input
          type="checkbox"
          [(ngModel)]="processRule"
          [ngModelOptions]="{standalone: true}"/>
        Process Rule 1
      </div>
    </div>
    <div  class="flex-column text-body">
      <div class="form-group">
        <br>
        <h6>Other Rules</h6>
        <input
          type="checkbox"
          [(ngModel)]="otherRule"
          [ngModelOptions]="{standalone: true}"/>
        Other Rule 1
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
      <button class="btn btn-md btn-primary" (click)="addRoleToOrganization()">Add</button>
    </div>
  `,
})
export class AddRoleToOrganizationComponent {
  role = '';
  processRule = '';
  otherRule = '';
  user: User = new User();
  organization: Organization = new Organization;
  saved: EventEmitter<any> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal, private gateway: GatewayProvider) {
    this.gateway.getUser()
      .then((user) => {
        if (user.organization !== null) {
          this.organization.oid = user.organization.oid;
          this.organization.organizationName = user.organization.organizationName;
          this.organization.description = user.organization.description;
        }
      })
  }

  closeModal() {
    this.activeModal.close();
  }

  addRoleToOrganization = () => {
  }

}
