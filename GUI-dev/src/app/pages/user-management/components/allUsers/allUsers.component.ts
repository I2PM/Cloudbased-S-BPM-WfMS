import {Component, OnInit} from '@angular/core';
import {ProcessesService} from '../../../../allProcesses.service';
import {Router, ActivatedRoute} from '@angular/router';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {Role, User} from '../../../../../models/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {AddUserToOrgComponent} from '../addUserToOrg/addUserToOrg.component';
import {AddRoleToUserComponent} from '../addRoleToUser/addRoleToUser.component';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'ngx-all-users',
  styleUrls: ['allUsers.component.scss'],
  providers: [ToasterService],
  templateUrl: './allUsers.html',
})
export class AllUsersComponent implements OnInit {

  navigationSubscription;
  myProcesses;
  user: User;
  inOrganization: boolean = false;
  orgaId: number;
  config: ToasterConfig;
  users: User[];

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

  initializeUsers() {
    this.gateway.getUsersOfMyOrg()
      .then((users) => this.users = users);
  }


  ngOnInit() {
    this.initializeUsers();
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


  public createToast() {
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'Hier könnte eine Meldung stehen!',
    };
    this.toasterService.popAsync(toast)
  }

  public openAddUserToOrgPopup() {
    const addUserToOrg = this.modalService.open(AddUserToOrgComponent,
      {size: 'lg', container: 'nb-layout'});
    addUserToOrg.componentInstance.saved.subscribe(() => {
      this.createToast();
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
    })
  }
  public openAddRoleToUserPopup() {
    const addRoleToUser = this.modalService.open(AddRoleToUserComponent,
      {size: 'lg', container: 'nb-layout'});
    addRoleToUser.componentInstance.saved.subscribe(() => {
      this.createToast();
      if (this.navigationSubscription) {
        this.navigationSubscription.unsubscribe();
      }
    })

  }



}
