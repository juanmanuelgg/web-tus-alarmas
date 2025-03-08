import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';

import { AlarmasService } from '../../services/alarmas/alarmas.service';
import Alarma from '../../services/alarmas/alarma';

@Component({
  selector: 'app-lista-alarmas',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './lista-alarmas.component.html',
  styleUrl: './lista-alarmas.component.scss',
})
export class ListaAlarmasComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  alarmas: Alarma[] = [];
  alarmasMostrar: Alarma[] = [];
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  resizeObservable!: Observable<Event>;
  resizeSubscription!: Subscription;

  private gridByBreakpoint: { [key: string]: number } = {
    xxl: 6,
    xl: 5,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1,
  };

  breakpoint = this.gridByBreakpoint['md'];

  private readonly router = inject(Router);
  private readonly alarmasService = inject(AlarmasService);

  constructor() {}

  private getAlarmas(): void {
    this.alarmasService.getAlarmas().subscribe((alarmas) => {
      this.length = alarmas.length;
      this.alarmas = alarmas;
      this.alarmasMostrar = this.alarmas.slice(0, this.pageSize);
    });
  }

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
    this.getAlarmas();
  }

  ngAfterContentInit(): void {
    const newSize = this.getBreakpoint(window.innerWidth);
    this.breakpoint = this.gridByBreakpoint[newSize];
    console.log(`Breakpoint: ${newSize}`);
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }

  public handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.alarmasMostrar = this.alarmas.slice(
      e.pageIndex * e.pageSize,
      e.pageIndex * e.pageSize + e.pageSize
    );
  }

  public openDetail(id: any = null): void {
    if (id && Number.isInteger(id))
      this.router.navigate(['/app/detalle-alarma', id]);
    else this.router.navigate(['/app/detalle-alarma']);
  }
}
