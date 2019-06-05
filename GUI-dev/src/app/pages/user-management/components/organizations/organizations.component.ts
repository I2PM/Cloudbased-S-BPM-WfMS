import {Component, OnInit} from '@angular/core';
import {ProcessesService} from '../../../../allProcesses.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {User} from '../../../../../models/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {EditOrgaModalComponent} from '../editOrgaModal/editOrgaModal.component';
import {CreateOrgaModalComponent} from '../createOrgaModal/createOrgaModal.component';


@Component({
  selector: 'ngx-organizations',
  styleUrls: ['organizations.component.scss'],
  providers: [ToasterService],
  templateUrl: './organizations.html',
})
export class OrganizationsComponent implements OnInit {


  myProcesses;
  user: User;
  inOrganization: boolean = false;
  orgaId: number;
  config: ToasterConfig;
  navigationSubscription;
  organizationName;
  organizationDescription;
  canEditOrg: boolean;
  canCreateOrg: boolean;

  constructor(protected service: ProcessesService, protected route: ActivatedRoute, protected router: Router,
              private gateway: GatewayProvider, private modalService: NgbModal,
              private toasterService: ToasterService) {

    this.config = new ToasterConfig({
      positionClass: 'toast-top-right',
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'slidedown',
      limit: 2,
    });

  }


  ngOnInit() {
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
        if (user.organization !== null) {
          this.inOrganization = true;
          if (this.inOrganization === true) {
            this.orgaId = user.organization.oid;
            this.organizationName = user.organization.organizationName;
            this.organizationDescription = user.organization.description;
          }
        }
      });
  }

  openCreateOrganization() {
    const createOrgaModal = this.modalService.open(CreateOrgaModalComponent,
      { size: 'lg', container: 'nb-layout' });
    createOrgaModal.componentInstance.saved.subscribe(() => {
      this.createToast();
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
    })
  }

  changeOrganization() {
    const editOrgaModal = this.modalService.open(EditOrgaModalComponent,
      {size: 'lg', container: 'nb-layout'});
    editOrgaModal.componentInstance.saved.subscribe(() => {
      this.editToast();
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
    })
  }

  public editToast() {
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'Ihre Organisation wurde erfolgreich geändert!',
    };
    this.toasterService.popAsync(toast)
  }

  public createToast() {
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'Hier könnte eine Meldung stehen!',
    };
    this.toasterService.popAsync(toast)
  }


}
