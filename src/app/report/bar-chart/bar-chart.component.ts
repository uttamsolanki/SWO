import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() barChartLabels: any;
  @Input() barChartData: any;
  @Input() barChartType: any;

  constructor() { }

  ngOnInit() {
//console.log(chartData);
  }

  public barChartLegend = true;

  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(102,178,255,.3)',
      borderWidth: 0
    }
  ];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    backgroundColor: 'rgba(148,159,177,0.2)'
  };

}
