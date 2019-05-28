import {Component, OnInit} from '@angular/core';
import {ProcessesService} from '../../../../allProcesses.service';
import {Router, ActivatedRoute} from '@angular/router';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {User} from '../../../../../models/models';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {AddRoleToOrganizationComponent} from '../addRoleToOrganization/addRoleToOrganization.component';


@Component({
  selector: 'ngx-all-roles',
  styleUrls: ['allRoles.component.scss'],
  providers: [ToasterService],
  templateUrl: './allRoles.html',
})
export class AllRolesComponent implements OnInit {

  navigationSubscription;
  myProcesses;
  user: User;
  inOrganization: boolean = false;
  orgaId: number;
  config: ToasterConfig;

  constructor(protected service: ProcessesService, protected route: ActivatedRoute, protected router: Router,
              private gateway: GatewayProvider,
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
          }
        }
      })
  }

  public addRolesToOrg() {
    /*
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'Rolle erfolgreich hinzugefügt!',
    };
    this.toasterService.popAsync(toast)
    */
    const addRolesToOrganization = this.modalService.open(AddRoleToOrganizationComponent,
      {size: 'lg', container: 'nb-layout'});
    addRolesToOrganization.componentInstance.saved.subscribe(() => {
      this.createToast();
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
    })
  }

  public deleteRoleFromOrg() {
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'Rolle erfolgreich gelöscht!',
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
