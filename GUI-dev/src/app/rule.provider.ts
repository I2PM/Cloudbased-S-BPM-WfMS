import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';

import {NbAuthService, NbAuthJWTToken} from '@nebular/auth';


export enum RuleScope {
  NONE = 0, MINE = 1, MY_ORG = 2, ALL = 3,
}

export enum RuleType {
  EDIT_ORG, CREATE_ORG, EDIT_USER_ROLE, EDIT_ROLE, EDIT_PROCESS, CREATE_PROCESS, READ_PROCESS, BUY_PROCESS, APPROVE_PROCESS,
}

@Injectable()
export class RuleProvider {


  constructor(private authService: NbAuthService) {
  }

  hasRuleWithMinScope(expectedRule: RuleType, expectedScope: RuleScope): Observable<boolean> {
    return this.getRules().map(
      rules => {
        if (rules.hasOwnProperty(expectedRule)) {
          return (rules[expectedRule] as RuleScope).valueOf() >= expectedScope.valueOf();
        }
        return false;
      });
  }

  getRules(): Observable<any> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return token.isValid() ? this.getRuleTypeScopeMap(token.getPayload().rules) : {};
        }),
      );
  }

  getRuleTypeScopeMap(rules: any[]): any {
    const scopeMap: {} = {};
    rules.forEach(rule => scopeMap[RuleType[rule['type']]] = RuleScope[rule['scope']]);
    return scopeMap;
  }
}
