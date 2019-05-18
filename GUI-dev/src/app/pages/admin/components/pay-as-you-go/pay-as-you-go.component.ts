import { Component, OnInit } from '@angular/core';
import { PAYGentry } from '../../../../../models/models';

@Component({
  selector: 'ngx-pay-as-you-go',
  templateUrl: './pay-as-you-go.component.html',
  styleUrls: ['./pay-as-you-go.component.scss']
})
export class PayAsYouGoComponent implements OnInit {

  processEntry: PAYGentry;

  constructor() { }

  ngOnInit() {

  }

}
