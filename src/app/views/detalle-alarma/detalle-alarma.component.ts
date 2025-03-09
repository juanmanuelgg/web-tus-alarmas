import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';

import { AlarmasService } from '../../services/alarmas/alarmas.service';
import Alarma from '../../services/alarmas/alarma';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-detalle-alarma',
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './detalle-alarma.component.html',
  styleUrl: './detalle-alarma.component.scss',
})
export class DetalleAlarmaComponent implements OnInit {
  alarma?: Alarma;

  detalleAlarmaForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*(:[0-9]*)?([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg)/),
    ]),
    alarms: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9](,([01]?[0-9]|2[0-3]):[0-5][0-9])*$/
      ),
    ]),
    active: new FormControl(false, []),
  });

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly alarmasService = inject(AlarmasService);

  constructor() {}

  ngOnInit(): void {
    const alarmId = this.route.snapshot.paramMap.get('id');
    if (alarmId && Number.isInteger(+alarmId)) {
      this.alarmasService.getAlarma(alarmId).subscribe({
        next: (alarma) => {
          this.alarma = alarma;
          this.detalleAlarmaForm.setValue({
            name: alarma.name,
            description: alarma.description,
            image: alarma.image,
            alarms: alarma.alarms.join(','),
            active: alarma.active,
          });
        },
        error: (error) => {
          console.error('Error al obtener la alarma', error);
          this.router.navigate([`/app/${error.message}`]);
        },
      });
    } // fi
  }

  public editAlarma(): void {
    if (this.detalleAlarmaForm.valid) {
    }
  }

  public createsAlarma(): void {}

  public deleteAlarma(): void {}
}
