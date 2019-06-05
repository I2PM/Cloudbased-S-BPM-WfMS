import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import {HelpComponent} from './help.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    HelpComponent,
  ],
})
export class HelpModule { }
