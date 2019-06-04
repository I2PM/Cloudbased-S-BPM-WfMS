import { Component, OnInit } from '@angular/core';
import { PAYGentry, User } from '../../../../../models/models';
import { GatewayProvider } from '../../../../@theme/providers/backend-server/gateway';

@Component({
  selector: 'ngx-pay-as-you-go',
  templateUrl: './pay-as-you-go.component.html',
  styleUrls: ['./pay-as-you-go.component.scss'],
})
export class PayAsYouGoComponent implements OnInit {

  currentUser: User;
  currentOrg: number;
  PAYGentryList: PAYGentry[];
  totalProcessesCost: number = 0;
  currentDateTime;
  currentDuration;
  currentCost: number = 0;
  isStopSenselessCounting = false;

  constructor(private gateway: GatewayProvider) { }

  ngOnInit() {
    this.gateway.getUser()
      .then(user => {
        this.currentUser = user;
        this.currentOrg = this.currentUser.organization.oid;
        if (Number.isInteger(this.currentOrg)) {
          this.gateway.getPayAsYouGo(this.currentOrg)
            .then(payg => {
              //console.log('inside PAYG then');
              console.log(payg);
              this.PAYGentryList = payg;
              this.PAYGentryList.forEach(entry => this.totalProcessesCost += entry.totalCost);
            })
            .catch(err => {
              console.log('inside gateway ERROR');
              console.log(err);
            });
        } else console.log('The organization of the current user does either not exist or is not in correct org ID format');
      })
      .catch(err => {
        console.log('inside getUser ERROR');
        console.log(err);
      });
  }

  getCurrentDateTime() {
    const date = new Date(Date.now());

    const dayOfMonth = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const monthOfYear = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    const minutesOfHour = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    this.currentDateTime = dayOfMonth + '.' + monthOfYear + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + minutesOfHour;

    return this.currentDateTime;
  }

  getCurrentDuration(dateTimeStart: Date) {
    const startDayMilliSeconds = new Date(dateTimeStart).getTime();
    const currentDayMilliSeconds = new Date(Date.now()).getTime();
    const differenceSeconds = (currentDayMilliSeconds - startDayMilliSeconds) / 1000;

    const h = Math.floor(differenceSeconds / 3600);
    const m = Math.floor(differenceSeconds % 3600 / 60);
    const s = Math.floor(differenceSeconds % 3600 % 60);

    const hString = (h < 10 ? '0' : '') + h;
    const mString = (m < 10 ? '0' : '') + m;
    const sString = (s < 10 ? '0' : '') + s;

    this.currentDuration = hString + ':' + mString + ':' + sString;

    return this.currentDuration;
  }

  getCurrentTotalCost(duration: string, rate: number) {
    const pattern: RegExp = /(\d{2}):(\d{2}):(\d{2})/g;
    const regMatch = pattern.exec(duration);
    const hourMatch = parseInt(regMatch[1]);
    const minMatch = parseInt(regMatch[2]);

    this.currentCost = (hourMatch * 60 + minMatch + 1) * rate; // "+ 1" weil die angelaufene Minute ja auch zählt :P

    if (!this.isStopSenselessCounting) {
      this.totalProcessesCost = this.totalProcessesCost + this.currentCost;
      this.isStopSenselessCounting = true;
    }

    return this.currentCost.toFixed(2);
  }

}
