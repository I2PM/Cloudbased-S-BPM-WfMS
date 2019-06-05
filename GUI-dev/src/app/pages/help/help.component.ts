import {Component, OnInit} from '@angular/core';
import {GatewayProvider} from '../../@theme/providers/backend-server/gateway';
import {AverageRating, StoreProcess} from '../../../models/models';
import {Router} from '@angular/router';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';

@Component({
  selector: 'ngx-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {



  constructor(private gateway: GatewayProvider, private router: Router, private authService: NbAuthService) {
  }

  ngOnInit() {
  }


}
