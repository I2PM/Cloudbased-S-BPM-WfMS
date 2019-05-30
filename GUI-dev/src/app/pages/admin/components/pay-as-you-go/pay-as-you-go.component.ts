import { Component, OnInit } from '@angular/core';
import {PAYGentry, User} from '../../../../../models/models';
import {GatewayProvider} from "../../../../@theme/providers/backend-server/gateway";

@Component({
  selector: 'ngx-pay-as-you-go',
  templateUrl: './pay-as-you-go.component.html',
  styleUrls: ['./pay-as-you-go.component.scss'],
})
export class PayAsYouGoComponent implements OnInit {

  currentUser: User;
  currentOrg: number;
  PAYGentryList: PAYGentry[] = [];

  constructor(private gateway: GatewayProvider) { }

  ngOnInit() {
    this.gateway.getUser()
      .then(res => {
        console.log(res);
        this.currentUser = res;
        this.currentOrg = this.currentUser.organization.oid;
        if (Number.isInteger(this.currentOrg)) {
          this.gateway.getPayAsYouGo(this.currentOrg)
            .then(res => {
              console.log(res);
              this.PAYGentryList = res;
            })
        }
        else console.log("The organization of the current user does either not exist or is not a correct org ID.");
      })
      .catch(err => console.log(err));
  }

}
