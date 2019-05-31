import { Component, OnInit } from '@angular/core';
import { PAYGentry, User } from '../../../../../models/models';
import { GatewayProvider } from '../../../../@theme/providers/backend-server/gateway';
import { ProcessesService } from '../../../../allProcesses.service';

@Component({
  selector: 'ngx-pay-as-you-go',
  templateUrl: './pay-as-you-go.component.html',
  styleUrls: ['./pay-as-you-go.component.scss'],
})
export class PayAsYouGoComponent implements OnInit {

  currentUser: User;
  currentOrg: number;
  PAYGentryList: PAYGentry[];

  constructor(private gateway: GatewayProvider,
              private procServ: ProcessesService) { }

  ngOnInit() {
    this.gateway.getUser()
      .then(user => {
        this.currentUser = user;
        this.currentOrg = this.currentUser.organization.oid;
        if (Number.isInteger(this.currentOrg)) {
          this.gateway.getPayAsYouGo(this.currentOrg)
            .then(payg => {
              console.log('inside PAYG then');
              console.log(payg);
              this.PAYGentryList = payg;
            })
            .catch(err => {
              console.log('inside gateway ERROR');
              console.log(err);
              /*
              this.procServ.getPayAsYouGo(this.currentOrg)
                .subscribe((payg: PAYGentry[]) => {
                    console.log('inside PAYG sub');
                    console.log(payg);
                    this.PAYGentryList = payg;
                  },
                  err => {
                    console.log('inside procServ ERROR');
                    console.log(err);
                  });
              */
            });


        } else console.log('The organization of the current user does either not exist or is not a correct org ID.');
      })
      .catch(err => {
        console.log('inside getUser ERROR');
        console.log(err);
      });

  }

}
