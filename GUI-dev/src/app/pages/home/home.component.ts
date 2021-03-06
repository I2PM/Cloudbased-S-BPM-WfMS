import {Component, OnInit} from '@angular/core';
import {GatewayProvider} from '../../@theme/providers/backend-server/gateway';
import {AverageRating, StoreProcess} from '../../../models/models';
import {Router} from '@angular/router';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public processes: StoreProcess[] = [];
  public processesByDate: StoreProcess[] = [];
  public processesByRating = [];
  public ratings: AverageRating[] = [];
  public emailAdress: String;

  user = {};
  authenticated = false;
  limit = 5;

  data: StoreProcess[] = [];

  settings = {
    columns: {
      processName: {
        title: 'Process Name',
      },
      processDescription: {
        title: 'Description',
      },
      /*
      processCreator: {
        title: 'Creator',
      },*/
      processApprover: {
        title: 'Process Approver',
      },
      processApproverComment: {
        title: 'Comment',
      },
      processApproved: {
        title: 'Is Approved',
      },
    },
    actions: false,
  };

  constructor(private gateway: GatewayProvider, private router: Router, private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
          this.emailAdress = token.getPayload().email;
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
      }, error => console.error(error.toString()));
  }

  ngOnInit() {
    this.getProcesses()
      .then((processArray) => {
        this.processes = processArray;
        this._filterDataAfterCreator();
        // this.sortProcessesByDate(processArray);
        // this.sortProcessesByRating(processArray);
      })
  }

  _filterDataAfterCreator() {
    let mailAdress = this.emailAdress;
    this.processes = this.processes.filter(function (process) {
      return process.processCreator === mailAdress;
    });
    this.data = this.processes;
  }

  getProcesses(): Promise<Array<StoreProcess>> {
    return this.gateway.getStoreProcesses()
      .then((processes) => {
        return processes
      });
  }

  onUserRowSelect(event): void {
    this._showDetails(event.data.processId);
  }

  _showDetails(processId) {
    this.router.navigate(['/processstore-details/', processId]);
  }

  /* sortProcessesByDate(processArray) {
    this.processesByDate = processArray.sort((a, b) => {
      return b.processApprovedDate - a.processApprovedDate;
    }).slice(0, this.limit);
  }

  sortProcessesByRating(processArray) {
    const processes: StoreProcess[] = [];
    Promise.all(processArray.map(
      (process) => this.gateway.getAverageRating(process.processId).then(
        (average) => {
          this.ratings.push(average);
          processes.push(process);
        },
      ))).then(
      () => {
        const combination = this.ratings.map((rating, i) => {
          return [rating.averageRating, processes[i]]
        });
        combination.sort((a, b) => {
          if (a[0] === b[0]) {
            return 0;
          } else {
            return (a[0] < b[0] ? -1 : 1)
          }
        });
        for (const element of combination) {
          // shows as an error but works ...
          this.processesByRating.push(element[1] as StoreProcess);
        }

        this.processesByRating = this.processesByRating.slice(0, this.limit);
        this.ratings.sort((a, b) => a.averageRating - b.averageRating)
      })
  } */
}
