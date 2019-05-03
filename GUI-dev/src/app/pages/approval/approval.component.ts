import {Component, Input, OnInit} from '@angular/core';
import {Process, StoreProcess, User} from '../../../models/models';
import {Review} from '../../../models/models';
import { GatewayProvider } from '../../@theme/providers/backend-server/gateway';
import {Router} from '@angular/router';



@Component({
  selector: 'ngx-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent implements OnInit {

  @Input() process;
  // public processes: Process[] = [];
  public processes;
  @Input() review: Review;
  public reviews: Review[] = [];
  public selectedProcess: Process;
  public selectedReviews: Review[] = [];


  settings = {
    columns: {
      processId: {
        title: 'ID',
      },
      processName: {
        title: 'Process Name',
      },
      processDescription: {
        title: 'Description',
      },
      processCreator: {
        title: 'Creator',
      },
      processApprover: {
        title: 'Process Approver',
      },
      processApproved: {
        title: 'Is Approved',
      },
    },
    actions: false,
  };

  data: StoreProcess[] = [];
  loggedInUser: User;

  constructor(private gateway: GatewayProvider, private router: Router) {

  }
  // Only users with SYS_APPROVER role can access approval page

  ngOnInit() {
    // this.getUnapprovedProcesses();
    this._getUser();
    this._getAllProcesses();
  }

  getUnapprovedProcesses() {
      this.gateway.getUnapprovedStoreProcesses()
        .then((processes) => {
        this.processes = processes;
        this.data = processes;
        })
  }

  _getUser() {
    this.gateway.getUser()
      .then((user) => {
        this.loggedInUser = user;
      })
  }

  _getAllProcesses() {
    this.gateway.getStoreProcesses().then((processes) => {
      this.processes = processes;
      this._sortDataAfterApprover();
    })
  }

  _sortDataAfterApprover() {
    const userUid = '' + this.loggedInUser.uid;
    this.processes = this.processes.filter(function (approver) {
      return approver.processApprover === userUid;
    });
    //TODO: show not number of approver - show name of approver
    this.data = this.processes;
  }

  loadDetails(processId: number) {
    this.router.navigate(['/approval-details/', processId])
  }

  onUserRowSelect(event): void {
    // console.log(event.data.processId);
    this.loadDetails(event.data.processId);
    // this.loadDetails(processId);
  }

}
