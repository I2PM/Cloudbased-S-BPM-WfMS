import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import {HomeComponent} from './home.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule { }
