import {Component, ViewChild, ViewEncapsulation, Input, Output, ElementRef, EventEmitter} from '@angular/core';

import {BaThemePreloader} from '../../../theme/services';

import './baAmChart.loader.ts';
import {BaAmChartThemeService} from './baAmChartTheme.service';
import {AmChart} from '@amcharts/amcharts3-angular'

@Component({
  providers: [NgModel, BaAmChartThemeService],
  selector: 'ba-am-chart',
  templateUrl: './baAmChart.html',
  encapsulation: ViewEncapsulation.None,
  providers: [BaAmChartThemeService],
})
export class BaAmChart {

  @Input() baAmChartConfiguration:Object;
  @Input() baAmChartClass:string;
  @Output() onChartReady = new EventEmitter<any>();

  @ViewChild('baAmChart') private _selector:ElementRef;

  private AmChart: AmChart;


  constructor (private _baAmChartThemeService:BaAmChartThemeService) {
    this._loadChartsLib();
  }

  ngOnInit() {
    this.AmChart.themes.blur = this._baAmChartThemeService.getTheme();
  }

  ngAfterViewInit() {
    let chart = this.AmChart.makeChart(this._selector.nativeElement, this.baAmChartConfiguration);
    this.onChartReady.emit(chart);
  }

  private _loadChartsLib():void {
    BaThemePreloader.registerLoader(new Promise((resolve, reject) => {
      let amChartsReadyMsg = 'AmCharts ready';

      if (this.AmChart.isReady) {
        resolve(amChartsReadyMsg);
      } else {
        this.AmChart.ready(function () {
          resolve(amChartsReadyMsg);
        });
      }
    }));
  }
}
