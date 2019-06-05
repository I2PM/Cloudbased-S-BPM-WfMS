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
  filteredPAYGentryList: PAYGentry[];
  totalProcessesCost: number = 0;
  currentDateTime;
  currentDuration;
  currentCost: number = 0;
  isStopSenselessCounting = false;
  distinctYearMonthCombos = new Set<string>();

  constructor(private gateway: GatewayProvider) { }

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
              this.filteredPAYGentryList = payg;
              this.PAYGentryList.forEach(entry => {
                this.totalProcessesCost += entry.totalCost;
                this.distinctYearMonthCombos.add(entry.dateTimeStart[0] + '-' + entry.dateTimeStart[1]);
              });
              //console.log(this.filteredPAYGentryList);
              //this.PAYGentryList.forEach(entry => );
              //console.log(this.distinctYearMonthCombos);
            })
            .catch(err => {
              //console.log('inside gateway ERROR');
              //console.log(err);
            });
        } //else console.log('The organization of the current user does either not exist or is not in correct org ID format');
      })
      .catch(err => {
        //console.log('inside getUser ERROR');
        //console.log(err);
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
  
  

  getCurrentDuration(dateTimeStart: any) {

    var bits = dateTimeStart.split('.');
    bits[1] = bits[1].replace('0','');

    var bits2 = bits[2].split(' ');
    bits2[0]=bits2[0].replace('0','');

    dateTimeStart = bits[0]+'-'+bits[1]+'-'+bits2[0]+' '+bits2[1];

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

  getCurrentTotalCost(duration: any, rate: number) {

    let hourMatch;
    let minMatch;

    if(duration === 'NaN:NaN:NaN') {

      const currDate = new Date();
      let currDateString = currDate.toISOString();
    }
    else
    {
      console.log("not null!!")
      const pattern: RegExp = /(\d{2}):(\d{2}):(\d{2})/g;
      const regMatch = pattern.exec(duration);
      hourMatch = parseInt(regMatch[1]);
      minMatch = parseInt(regMatch[2]);


      this.currentCost = (hourMatch * 60 + minMatch + 1) * rate; // "+ 1" weil die angelaufene Minute ja auch zählt :P

      if (!this.isStopSenselessCounting) {
        this.totalProcessesCost = this.totalProcessesCost + this.currentCost;
        this.isStopSenselessCounting = true;
      }

      return this.currentCost.toFixed(2);
    }
  }

  showPAYGperMonth(yearMonth: string) {
    const pattern: RegExp = /(\d{4})-(\d{1,2})/g;
    const regMatch = pattern.exec(yearMonth);
    const yearMatch = parseInt(regMatch[1]);
    const monthMatch = parseInt(regMatch[2]);

    this.filteredPAYGentryList = this.PAYGentryList.filter(x => x.dateTimeStart[0] === yearMatch && x.dateTimeStart[1] === monthMatch);
    //console.log(this.filteredPAYGentryList);
    this.totalProcessesCost = 0;
    this.filteredPAYGentryList.forEach(entry => {
      this.totalProcessesCost += entry.totalCost;
      if (!entry.totalCost) this.calcTempTotalCost(entry);
    });
  }

  showAllPAYG() {
    this.filteredPAYGentryList = this.PAYGentryList;
    this.totalProcessesCost = 0;
    this.PAYGentryList.forEach(entry => {
      this.totalProcessesCost += entry.totalCost;
      if (!entry.totalCost) this.calcTempTotalCost(entry);
    });
  }

  calcTempTotalCost(entry: PAYGentry) {
    const fixStupidDateTimeFormat = entry.dateTimeStart[0] + '.' + entry.dateTimeStart[1] + '.' + entry.dateTimeStart[2] + ' ' + entry.dateTimeStart[3] + ':' + entry.dateTimeStart[4];
    const dur = this.getCurrentDuration(fixStupidDateTimeFormat);
    //console.log(dur);
    const cost: number = parseFloat(this.getCurrentTotalCost(dur, entry.rate));
    //console.log(cost);
    this.totalProcessesCost = this.totalProcessesCost + cost;
  }

}
