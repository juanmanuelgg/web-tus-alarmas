import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reportes',
  imports: [NgApexchartsModule, MatCardModule, MatGridListModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss',
})
export class ReportesComponent implements OnInit, AfterContentInit {
  resizeObservable!: Observable<Event>;
  resizeSubscription!: Subscription;

  private gridByBreakpoint: { [key: string]: number } = {
    xxl: 3,
    xl: 3,
    lg: 2,
    md: 2,
    sm: 1,
    xs: 1,
  };

  breakpoint = this.gridByBreakpoint['md'];

  chartOptions1: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  } = {
    series: [
      {
        name: 'Alarmas atendidas',
        data: [56, 57, 9, 97, 43, 37, 54, 72, 24, 67, 27, 87],
      },
    ],
    chart: {
      height: 350,
      type: 'bar',
    },
    title: {
      text: 'Resumen 2024',
    },
    xaxis: {
      categories: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
    },
  };

  chartOptions2: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    colors: any;
  } = {
    series: [
      {
        name: "Lunes",
        data: this.generateData(52, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Martes",
        data: this.generateData(52, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Miercoles",
        data: this.generateData(52, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Jueves",
        data: this.generateData(52, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Viernes",
        data: this.generateData(52, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Sabado",
        data: this.generateData(52, {
          min: 0,
          max: 10
        })
      },
      {
        name: "Domingo",
        data: this.generateData(52, {
          min: 0,
          max: 10
        })
      }
    ],
    chart: {
      height: 350,
      type: "heatmap"
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#008FFB"],
    title: {
      text: "Resumen diario 2024"
    }
  };

  chartOptions3: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    colors: any;
  } = {
    series: [
      {
        name: "Lunes",
        data: this.generateData(11, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Martes",
        data: this.generateData(11, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Miercoles",
        data: this.generateData(11, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Jueves",
        data: this.generateData(11, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Viernes",
        data: this.generateData(11, {
          min: 0,
          max: 90
        })
      },
      {
        name: "Sabado",
        data: this.generateData(11, {
          min: 0,
          max: 10
        })
      },
      {
        name: "Domingo",
        data: this.generateData(11, {
          min: 0,
          max: 10
        })
      }
    ],
    chart: {
      height: 350,
      type: "heatmap"
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#008FFB"],
    title: {
      text: "Resumen diario 2025"
    }
  };

  constructor() {}

  // https://getbootstrap.com/docs/5.0/layout/breakpoints/#available-breakpoints
  private getBreakpoint(size: number): string {
    if (size < 576) return 'xs';
    else if (size < 768) return 'sm';
    else if (size < 992) return 'md';
    else if (size < 1200) return 'lg';
    else if (size < 1400) return 'xl';
    return 'xxl';
  }

  ngOnInit(): void {
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe((evt) => {
      const target = evt.target as Window;
      if (target) {
        const newSize = this.getBreakpoint(target.innerWidth);
        this.breakpoint = this.gridByBreakpoint[newSize];
        console.log(`Breakpoint: ${newSize}`);
      }
    });
  }

  ngAfterContentInit(): void {
    const newSize = this.getBreakpoint(window.innerWidth);
    this.breakpoint = this.gridByBreakpoint[newSize];
    console.log(`Breakpoint: ${newSize}`);
  }

  public generateData(count: number, yrange: { min: number; max: number; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
}
