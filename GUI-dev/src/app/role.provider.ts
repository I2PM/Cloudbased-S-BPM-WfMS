import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';

import {NbAuthService, NbAuthJWTToken} from '@nebular/auth';
import {NbRoleProvider} from '@nebular/security';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  // Tabelle für Lookup von Rollen aus der Datenbank
  static readonly ROLES = {
    USER: 'USER',
    ORG_EMP: 'ORG_EMP',
    ORG_CEO: 'ORG_CEO',
    SYS_ADMIN: 'SYS_ADMIN',
    SYS_APPROVER: 'SYS_APPROVER',
  };


  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          // temporary using first role
          // todo: implement proper role array utilization
          //return token.isValid() ? 'SYS_ADMIN' : 'guest';
          return 'SYS_ADMIN';
        }),
      );
  }
}
