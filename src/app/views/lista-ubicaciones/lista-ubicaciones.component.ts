import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { UbicacionesService } from '../../services/ubicaciones/ubicaciones.service';
import Ubicacion from '../../services/ubicaciones/ubicacion';

@Component({
  selector: 'app-lista-ubicaciones',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './lista-ubicaciones.component.html',
  styleUrl: './lista-ubicaciones.component.scss',
})
export class ListaUbicacionesComponent implements OnInit {
  ubicaciones: Ubicacion[] = [];
  ubicacionesMostrar: Ubicacion[] = [];
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageEvent: PageEvent = new PageEvent();

  private readonly router = inject(Router);
  private readonly ubicacionesService = inject(UbicacionesService);

  constructor() {}

  private getUbicaciones(): void {
    this.ubicacionesService.getUbicaciones().subscribe((ubicaciones) => {
      this.length = ubicaciones.length;
      this.ubicaciones = ubicaciones;
      this.ubicacionesMostrar = this.ubicaciones.slice(0, this.pageSize);
    });
  }

  ngOnInit(): void {
    this.getUbicaciones();
  }

  public handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.ubicacionesMostrar = this.ubicaciones.slice(
      e.pageIndex * e.pageSize,
      e.pageIndex * e.pageSize + e.pageSize
    );
  }

  public openDetail(id: any = null): void {
    if (id && Number.isInteger(id))
      this.router.navigate(['/app/detalle-ubicacion', id]);
    else this.router.navigate(['/app/detalle-ubicacion']);
  }
}
