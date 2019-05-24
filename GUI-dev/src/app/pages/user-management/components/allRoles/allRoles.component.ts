import {Component, OnInit} from '@angular/core';
import {ProcessesService} from '../../../../allProcesses.service';
import {Router, ActivatedRoute} from '@angular/router';
import {GatewayProvider} from '../../../../@theme/providers/backend-server/gateway';
import {User} from '../../../../../models/models';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';


@Component({
  selector: 'ngx-all-roles',
  styleUrls: ['allRoles.component.scss'],
  providers: [ToasterService],
  templateUrl: './allRoles.html',
})
export class AllRolesComponent implements OnInit {


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


  public createToast() {
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      body: 'Hier könnte eine Meldung stehen!',
    };
    this.toasterService.popAsync(toast)
  }


}
