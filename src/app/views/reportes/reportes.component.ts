import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';

@Component({
  selector: 'app-reportes',
  imports: [NgApexchartsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss',
})
export class ReportesComponent {
  chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  } = {
    series: [
      {
        name: 'My-series',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      height: 350,
      type: 'bar',
    },
    title: {
      text: 'My First Angular Chart',
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
  };

  constructor() {}
}
