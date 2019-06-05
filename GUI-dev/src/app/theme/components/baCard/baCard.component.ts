import {Component, ViewEncapsulation, ViewChild, Input} from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
  providers: [NgModel],
  selector: 'ba-card',
  styles: [require('./baCard.scss')],
  templateUrl: './baCard.html',
  encapsulation: ViewEncapsulation.None
})
export class BaCard {
  @Input() title:String;
  @Input() baCardClass:String;
  @Input() cardType;
}
