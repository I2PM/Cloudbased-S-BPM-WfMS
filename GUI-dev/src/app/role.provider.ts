import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';

import {NbAuthService, NbAuthJWTToken} from '@nebular/auth';
import {NbRoleProvider} from '@nebular/security';

@Injectable()
export class RoleProvider implements NbRoleProvider {
  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          // temporary using first role
          // todo: implement proper role array utilization
          if (token.isValid()) {
            return token.getPayload().roles.length > 0 ? token.getPayload().roles.filter(role => !role.subjectRole)[0].name : 'guest';
          }
          return 'guest';
        }),
      );
  }
}
