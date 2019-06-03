import { NgModule } from '@angular/core';
import { CommaDatePipe } from './commaDate.pipe';
import { CommonModule } from '@angular/common';
import { EngineDatePipe } from './engineDate.pipe';


@NgModule({
  declarations: [CommaDatePipe, EngineDatePipe],
  imports: [ CommonModule ],
  exports: [ CommaDatePipe, EngineDatePipe ],
})

export class Pipes{
  static forRoot() {
    return {
      ngModule: Pipes,
      providers: [],
    };
  }
}
