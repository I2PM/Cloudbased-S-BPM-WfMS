import {Component, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {Organization, User} from '../../../../../models/models';

@Component({
  selector: 'ngx-add-user-to-org',
  providers: [ToasterService],
  styleUrls: ['addUserToOrg.component.scss'],
  template: `
    <div class="modal-header">
      <!-- <toaster-container></toaster-container> -->
      <span>Add new user to this organisation</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div  class="flex-column text-body">
      <div class="form-group">
        <br>
        <h6>Email address</h6>
        <input name="emailAddress"  id="input-email" [(ngModel)]="email"
               class="form-control" placeholder="email address" #emailAddress="ngModel"
        >
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Cancel</button>
      <button class="btn btn-md btn-primary" (click)="addUser()">Add</button>
    </div>
  `,
})
export class AddUserToOrgComponent {

  email = '';
  user: User = new User();
  organization: Organization = new Organization;
  saved: EventEmitter<any> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal, private gateway: GatewayProvider, private toasterService: ToasterService) {
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

  addUser = () => {
    const positiveToast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'User erfolgreich zur Organisation hinzugefügt!',
    };
    const noUserToast: Toast = {
      type: 'error',
      title: 'Oh nein!',
      body: 'Wir konnten deinen User leider nicht finden!',
    };
    const negativeToast: Toast = {
      type: 'error',
      title: 'Oh nein!',
      body: 'Etwas ist schief gelaufen. Versuche es später erneut!',
    };
    this.gateway.getUserByEmail(this.email).then((res) => {
      this.user = res;
      this.user.organization = this.organization;
    }).then(() => {
      this.gateway.addUserToOrganisation(this.user).then((res) => {
        this.user = res;
      })
        .catch(() => {
          this.toasterService.popAsync(negativeToast)
        } )
    }).then(() => {
      this.activeModal.close()
      this.toasterService.popAsync(positiveToast)
    })
      .catch(() => {
        this.toasterService.popAsync(noUserToast)
      },
    );
  }

}
