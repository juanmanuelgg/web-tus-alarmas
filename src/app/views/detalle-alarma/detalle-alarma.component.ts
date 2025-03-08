import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlarmasService } from '../../services/alarmas/alarmas.service';
import Alarma from '../../services/alarmas/alarma';

@Component({
  selector: 'app-detalle-alarma',
  imports: [CommonModule],
  templateUrl: './detalle-alarma.component.html',
  styleUrl: './detalle-alarma.component.scss',
})
export class DetalleAlarmaComponent implements OnInit {
  modoCreacion = true;
  alarma?: Alarma;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly alarmasService = inject(AlarmasService);

  constructor() {}

  ngOnInit(): void {
    const alarmId = this.route.snapshot.paramMap.get('id');
    if (alarmId && Number.isInteger(+alarmId)) {
      this.modoCreacion = false;

      this.alarmasService.getAlarma(alarmId).subscribe({
        next: (alarma) => {
          this.alarma = alarma;
        },
        error: (error) => {
          console.error('Error al obtener la alarma', error);
          this.router.navigate([`/app/${error.message}`]);
        },
      });
    } // fi
  }
}
