import {Component, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {ToasterService} from 'angular2-toaster';
import {Organization, Rule, Role, User} from '../../../../../models/models';

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
        <input name="roleName"  id="input-role" [(ngModel)]="newRole.name"
               class="form-control" placeholder="Role Name" #roleName="ngModel"
        >
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          (change)="this.setAsProcessRole($event)"
        /> Process Role
      </div>
    </div>
    <div *ngIf="roles.length>1" style="margin-top: 35px;">
      <h6>Parent Role</h6>
      <br>
      <div *ngFor="let role of roles">
        <br>
        <input
          type="radio"
          [(ngModel)]="selectedRules[role.roleId]"
          [ngModelOptions]="{standalone: true}"
          value="{{role.roleId}}"
          (change)="preselectRules($event, role.rules, role)"
        /> {{role.name}}
      </div>
      <div *ngIf="this.displayGUIElements" style="margin-top: 35px;">
      <h6>Rules</h6>
        <div *ngFor="let rule of rules" class="form-group">
          <br>
          <input
            type="checkbox"
            [(ngModel)]="selectedRules[rule.ruleId]"
            [ngModelOptions]="{standalone: true}"
            value="{{rule.ruleId}}"
            (change)="selectRules($event, rule)"
            checked="{{this.preselectedRules.includes(rule.ruleId)}}"
          /> {{rule.systemId}}
        </div>
      </div>
    </div>
    <div class="modal-footer" style="margin-top:35px;">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
      <button class="btn btn-md btn-primary" (click)="addRoleToOrganization()">Add</button>
    </div>
  `,
})
export class AddRoleToOrganizationComponent {
  allRulesSelected = false;
  displayGUIElements = true;
  selectedRules = '';
  rules: Rule[] = new Array<Rule>();
  roles: Role[] = new Array<Role>();
  role = '';
  user: User = new User();
  organization: Organization = new Organization;
  saved: EventEmitter<any> = new EventEmitter();
  preselectedRules = [];
  allSelectedRules = [];
  newRole: Role = new Role;

  constructor(private activeModal: NgbActiveModal, private gateway: GatewayProvider) {
    this.gateway.getUser()
      .then((user) => {
        if (user.organization !== null) {
          this.organization.oid = user.organization.oid;
          this.organization.organizationName = user.organization.organizationName;
          this.organization.description = user.organization.description;
        }
      })
    this.getAllRulesAndRoles();
  }

  getAllRulesAndRoles() {
  this.gateway.getAllRules().then((res) => {
      this.rules = res;
    }).then(() => this.gateway.getPublicAndOwnRoles(this.organization).then((res) => this.roles = res))
  }

  closeModal() {
    this.activeModal.close();
  }

  addRoleToOrganization = () => {
    // TODO
    // Select all, select role checkbox refresh
    for (const eachRule of this.allSelectedRules){
      this.newRole.rules.push(eachRule);
    }
    this.newRole.systemId = this.organization.oid + '_' +
      this.organization.organizationName + '_' +
      this.newRole.name;
    this.newRole.organization = this.organization;
    this.gateway.createRole(this.newRole).then(() => {
      this.saved.emit('openPopup');
      this.activeModal.close();
    }).catch(err => console.log(err));
  }

  preselectRules(e, rules, role) {
    this.preselectedRules = [];
    for (const rule of rules) {
      this.preselectedRules.push(rule.ruleId);
    }
    this.newRole.parent = role;
    this.newRole.rules = rules;
  }

  selectRules(e, rule) {
    if (e.target.checked) {
      this.allSelectedRules.push(rule);
    } else {
      const index = this.allSelectedRules.indexOf(rule);
      this.allSelectedRules.splice(index, 1)
    }
    console.log(this.allSelectedRules);
  }

  setAsProcessRole(e) {
    if (e.target.checked) {
      this.newRole.subjectRole = true;
      this.displayGUIElements = false;
    } else {
      this.newRole.subjectRole = false;
      this.displayGUIElements = true;
    }
  }

}
