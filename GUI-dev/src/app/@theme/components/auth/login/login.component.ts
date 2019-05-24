/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';


import {NB_AUTH_OPTIONS, NbAuthSocialLink} from '@nebular/auth';
import {getDeepFromObject} from '@nebular/auth/helpers';
import {NbAuthService} from '@nebular/auth';
import {NbAuthResult} from '@nebular/auth';
import {NbAccessControl, NbAclRole, NbAclService} from '@nebular/security';
import {Role} from '../../../../../models/models';


@Component({
  selector: 'ngx-eb-login',
  templateUrl: 'login.component.html',
})
export class EbLoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected config = {},
              protected router: Router,
              protected aclService: NbAclService) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.aclService.setAccessControl(this.buildACLConfig(result.getToken().getPayload().roles));
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  buildACLConfig(allRoles: Role[]): NbAccessControl {
    const acl: NbAccessControl = {};
    const guiRoles = allRoles.filter(role => !role.subjectRole);

    if (guiRoles.length > 0) {
      let myRole = guiRoles[0];
      while (myRole !== null) {
        acl[myRole.name] = this.buildACLRole(myRole);
        myRole = myRole.parent;
      }
    }
    return acl;
  }

  buildACLRole(role: Role): NbAclRole {
    const aclRole: NbAclRole = {};
    if (role.parent !== null) {
      aclRole.parent = role.parent.name;
    }
    role.rules.forEach(rule => {
      if (aclRole[rule.crudType] === undefined) aclRole[rule.crudType] = [];
      (aclRole[rule.crudType] as string[]).push(rule.resource);
    });
    return aclRole;
  }

}
