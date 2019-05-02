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
  owlFile: File;
  file: File;
  processApprover: string;
  usersFromOrganization: User[];

  constructor(private gateway: GatewayProvider, private router: Router) {

  }

  ngOnInit() {
    this.gateway.getUser().then(user => this.creator = user.username);
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

  _getUsersFromOrganization() {
    this.gateway.getUsersOfMyOrg().then((users) => {
      let i;
      for (i = 0; i < users.length; i ++) {
        this.usersFromOrganization[i].email = users[i].email;
      }
    });
  }

  createProcess(): void {
    this.process.processCreator = this.creator;
    this.process.processApprover = this.processApprover;
    this.gateway.createProcess(this.process)
      .then(data => {this.gateway.uploadOWLModel(data.processId, this.owlFile); })
      .then(() => {this.router.navigateByUrl('/dashboard')});

  }
}
