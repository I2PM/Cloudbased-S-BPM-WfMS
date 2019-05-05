import {Component, OnInit} from '@angular/core';
import {StoreProcess, User} from '../../../models/models';
import {GatewayProvider} from '../../@theme/providers/backend-server/gateway';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.scss'],

})
export class CreateProcessComponent implements OnInit {

  process: StoreProcess = new StoreProcess();
  creator: string;
  userId: string;
  orgId: string;
  owlFile: File;
  file: File;
  processApprover: string;
  usersFromOrganization: User[];

  constructor(private gateway: GatewayProvider, private router: Router) {

  }

  ngOnInit() {
    this.gateway.getUser().then((user) => {
      this.creator = user.username;
      this.userId = '' + user.uid;
      this.orgId = '' + user.organization.oid;
      });
    this._getUsersFromOrganization();
  }

  onFileChange(event) {
    // const that = this;
    this.owlFile = event.srcElement.files[0];
    const split = this.owlFile.name.split('.');
    if (split[split.length - 1] !== 'owl') {
      this.owlFile = undefined;
      event.target.value = '';
    }
  }

  selectedApprover(uid) {
    this.process.processApprover = uid;
  }

  _getUsersFromOrganization() {
    this.gateway.getUsersOfMyOrg().then((users) => {
      this.usersFromOrganization = users;
    });
  }

  createProcess(): void {
    this.process.processCreator = this.creator;
    this.gateway.createProcess(this.process)
      .then(data => {
        this.gateway.addProcessToOrganization('' + data.processId, this.orgId, this.userId);
        this.gateway.uploadOWLModel(data.processId, this.owlFile); })
      .then(() => {
        // _addProcessToOrganisation();
        this.router.navigateByUrl('/dashboard')})
      .catch(err => console.warn(err))
    ;
  }
}
