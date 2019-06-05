import {Component, OnInit} from '@angular/core';
import {ProcessesService} from '../../../../allProcesses.service';
import {Router, ActivatedRoute} from '@angular/router';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {Role, User} from '../../../../../models/models';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {AddRoleToOrganizationComponent} from '../addRoleToOrganization/addRoleToOrganization.component';
import {EditRoleComponent} from '../editRole/editRole.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


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
  roles: Role[];

  inOrganization: boolean = false;
  orgaId: number;
  config: ToasterConfig;

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
          }
        }
      }).then(() => this.getAllRolesOfOrg())
  }

  public getAllRolesOfOrg() {
    this.gateway.getRolesOfOrganization(this.user.organization).then((res) => {
      this.roles = res;
    })
  }

  public addRolesToOrg() {
    const addRolesToOrganization = this.modalService.open(AddRoleToOrganizationComponent,
      {size: 'lg', container: 'nb-layout'});
    addRolesToOrganization.componentInstance.saved.subscribe(() => {
      this.createToast();
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
    })
  }

  public editRole(role) {
    const editRole = this.modalService.open(EditRoleComponent,
      {size: 'lg', container: 'nb-layout'});
    editRole.componentInstance.role = role;
    editRole.componentInstance.saved.subscribe(() => {
      this.createToast();
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
    })
  }

  public deleteRoleFromOrg(roleId) {
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'Rolle erfolgreich gelöscht. Bitte aktualisieren Sie die Seite!',
    };
    this.toasterService.popAsync(toast);
    this.gateway.deleteRole(roleId).catch(() => console.log('could not delete role'));
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
