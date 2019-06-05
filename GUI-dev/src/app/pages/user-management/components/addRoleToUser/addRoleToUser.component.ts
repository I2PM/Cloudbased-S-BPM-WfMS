import {Component, EventEmitter, Input} from '@angular/core';
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
    <div  class="flex-column text-body" style="margin-top: 35px;">
      <h6>GUI Roles</h6>
      <div *ngIf="guiRoles.length===0">
        You don't have any GUI roles, that you could add.
      </div>
      <div *ngFor="let guiRole of guiRoles" class="form-group">
        <br>
        <input
          type="radio"
          [(ngModel)]="selectedGUIRoles[guiRole.roleId]"
          [ngModelOptions]="{standalone: true}"
          value="{{guiRole.roleId}}"
          (change)="selectGUIRole($event, guiRole)"
        />
        {{guiRole.name}}
      </div>
    </div>
    <div  class="flex-column text-body" style="margin-top: 35px;">
      <h6>Process Roles</h6>
      <div *ngIf="processRoles.length===0">
        You don't have any process roles, that you could add.
      </div>
      <div *ngFor="let processRole of processRoles" class="form-group">
        <br>
        <input
          type="checkbox"
          [(ngModel)]="selectedProcessRoles[processRole.roleId]"
          [ngModelOptions]="{standalone: true}"
          value="{{processRole.roleId}}"
          (change)="selectProcessRole($event, processRole)"
        />
        {{processRole.name}}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
      <button
        *ngIf="organizationRoles.length!=0"
        class="btn btn-md btn-primary"
        (click)="addRole()">Add</button>
    </div>
  `,
})
export class AddRoleToUserComponent {
  @Input() public user;
  error: Boolean = false;
  selectedGUIRoles = '';
  selectedProcessRoles = '';
  email = '';
  organization: Organization = new Organization;
  saved: EventEmitter<any> = new EventEmitter();
  // organizationRoles: Role[];
  organizationRoles: Role[] = new Array<Role>();
  guiRoles: Role[] = new Array<Role>();
  processRoles: Role[] = new Array<Role>();
  roleToBeAdded: Role;

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
      for (const role of this.organizationRoles) {
        if (role.subjectRole === true) {
          this.processRoles.push(role);
        } else {
          this.guiRoles.push(role);
        }
      }
    })
      .catch( (err) =>
        // tslint:disable-next-line
        console.log("sth. went wrong" + err.message)
      );
  }

  selectGUIRole(e, role) {
    console.log(e.target.checked);
    console.log(role);
    // this.displayAddButton = false;
    this.roleToBeAdded = role;
  }
  selectProcessRole(e, role) {
    console.log(e.target.checked);
    console.log(role);
    // this.displayAddButton = false;
    // this.roleToBeAdded = role;
  }

  addRole() {
    this.gateway.addRoleToUser(this.user, this.roleToBeAdded)
      .then(() => {
        this.saved.emit('openPopup');
        this.activeModal.close();
      })
      .catch( (err) =>
      // tslint:disable-next-line
      console.log("sth. went wrong" + err.message)
    );
  }

}
