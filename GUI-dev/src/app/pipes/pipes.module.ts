import { NgModule } from '@angular/core';

import {CommaDatePipe} from './commaDate.pipe';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations:[CommaDatePipe],
  imports:[ CommonModule ],
  exports:[ CommaDatePipe ]
})

export class Pipes{}
