/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import {RouterModule} from '@angular/router';
import {FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken, NbAuthModule } from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { RoleProvider } from './role.provider';
import { AuthGuard } from './auth-guard.service';
import { EbEmailPassAuthProvider } from './@theme/providers/auth/email-pass-auth.provider';
import { AsyncEmailValidatorProvider } from './@theme/providers/async-email-validator/async-email-validator';
import { ServerConfigProvider } from './@theme/providers/backend-server/serverconfig';
import {EventLoggerService} from './evntLogger.service';
import {ProcessesService} from './allProcesses.service';
import {ApprovalAuthGuard} from './approval-auth-guard.service';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import {User} from './user';
import {BaThemeSpinner} from "./theme/services/baThemeSpinner";
import {PagesComponent} from "./pages/pages.component";
import {NgFileSelectDirective} from "ng2-uploader/src/directives/ng-file-select";
import {NgFileDropDirective} from "ng2-uploader/src/directives/ng-file-drop";
import {ModalModule} from 'ngb-modal';

@NgModule({
  declarations: [AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    AmChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    NbAuthModule.forRoot({
      providers: {
        email: {
          service: EbEmailPassAuthProvider,
          config: {
            // baseEndpoint: 'http://gateway:10000',
            login: {
              endpoint: 'http://gateway:10000/user/login',
              redirect: {
                success: 'dashboard',
              },
            },
            logout: {
              endpoint: '',
            },
            register: {
              endpoint: 'http://gateway:10000/user/register',
              redirect: {
                success: '/auth/login',
              },
            },
            token: {
              key: 'token',
            },
          },
        },
      },
      // don't delete
      forms: {
        validation: {
        },
      },
      //
    }),

    NbSecurityModule.forRoot(),

  ],
  bootstrap: [AppComponent],
  providers: [
    AsyncEmailValidatorProvider,
    ServerConfigProvider,
    AuthGuard,
    ApprovalAuthGuard,
    EventLoggerService,
    ProcessesService,
    RoleProvider,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
    { provide: NbRoleProvider, useClass: RoleProvider },
    { provide: User, useClass: User},
    BaThemeSpinner,
  ]
})
export class AppModule {
}
