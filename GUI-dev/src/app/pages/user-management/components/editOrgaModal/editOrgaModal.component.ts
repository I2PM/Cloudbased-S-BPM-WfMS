import {Component, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Organization, User} from '../../../../../models/models';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'ngx-edit-orga-modal',
  providers: [ToasterService],
  styleUrls: ['editOrgaModal.component.scss'],
  template: `
    <div class="modal-header">
      <!-- <toaster-container></toaster-container> -->
      <span>Edit organization</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="flex-column text-body">
      <div class="form-group">
        <br>
        <h6>organization name</h6>
        <input name="organizationName" id="input-organizationName" [(ngModel)]="organization.organizationName"
               class="form-control" value="{{organizationName}}"
        >
      </div>
      <div class="form-group">
        <br>
        <h6>organization description</h6>
        <input name="organizationDescription" id="input-organizationDescription" [(ngModel)]="organization.description"
               class="form-control" value="{{organizationDescription}}"
        >
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
      <button class="btn btn-md btn-primary" (click)="saveModal()">Save</button>
    </div>
  `,
})
export class EditOrgaModalComponent {

  organization: Organization = new Organization;
  saved: EventEmitter<any> = new EventEmitter();
  user: User;
  inOrganization: boolean = false;
  config: ToasterConfig;
  orgaId: number;
  organizationName;
  organizationDescription;


  constructor(private activeModal: NgbActiveModal, private gateway: GatewayProvider) {
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
        if (user.organization !== null) {
          this.inOrganization = true;
          if (this.inOrganization === true) {
            this.organization.oid = user.organization.oid;
            this.organizationName = user.organization.organizationName;
            this.organizationDescription = user.organization.description;
          }
        }
      })
  }

  closeModal() {
    this.activeModal.close();
  }

  saveModal = () => {
    this.gateway.editOrganisation(this.organization)
      .then(() => {
        this.saved.emit('openPopup');
        this.activeModal.close();
      })
      .catch(
        // console.log("sth. went wrong" + err.message)
      );
  }


}
