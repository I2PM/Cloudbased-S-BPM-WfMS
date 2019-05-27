import {GatewayProvider} from "../../@theme/providers/backend-server/gateway";
import {NbAccessChecker} from "@nebular/security";
import {Component, OnInit} from '@angular/core';
import { User} from '../../../models/models';

@Component({
  selector: 'myprocesses',
  styles: [],
  templateUrl: './myprocesses.component.html'
})
export class MyProcesses implements OnInit{

  user: User;

  tabs: any[] = [
    {
      title: 'Startable Processes',
      route: '/myprocesses/startable',
    },
    {
      title: 'Active Processes',
      route: '/myprocesses/active',
    },
    {
      title: 'Terminated Processes',
      route: '/myprocesses/terminated',
    },
  ];
  constructor(private gateway: GatewayProvider, public accessChecker: NbAccessChecker) {
  }
  ngOnInit() {
    this.gateway.getUser()
      .then((user) => {
        this.user = user;
      })

    console.log("On Init by MyProcesses invoked");
    console.log(this.tabs);
  }





}
