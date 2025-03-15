import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';

import { UbicacionesService } from '../../services/ubicaciones/ubicaciones.service';
import Ubicacion from '../../services/ubicaciones/ubicacion';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-detalle-ubicacion',
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './detalle-ubicacion.component.html',
  styleUrl: './detalle-ubicacion.component.scss',
})
export class DetalleUbicacionComponent implements OnInit {
  ubicacion?: Ubicacion;

  detalleUbicacionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(http(s?):)([/|.|\w|\s|-])*(:[0-9]*)?([/|.|\w|\s|-])*\.(?:jp(e?)g|gif|png|svg)$/
      ),
    ]),
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required]),
    radio: new FormControl(0, [Validators.required, Validators.min(10)]),
    active: new FormControl(false, []),
  });

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ubicacionsService = inject(UbicacionesService);

  constructor() {}

  ngOnInit(): void {
    const alarmId = this.route.snapshot.paramMap.get('id');
    if (alarmId && Number.isInteger(+alarmId)) {
      this.ubicacionsService.getUbicacion(alarmId).subscribe({
        next: (ubicacion) => {
          this.ubicacion = ubicacion;
          this.detalleUbicacionForm.setValue({
            name: ubicacion.name,
            description: ubicacion.description,
            image: ubicacion.image,
            latitude: ubicacion.latitude,
            longitude: ubicacion.longitude,
            radio: ubicacion.radio,
            active: ubicacion.active,
          });
        },
        error: (error) => {
          console.error('Error al obtener la ubicacion', error);
          this.router.navigate([`/app/${error.message}`]);
        },
      });
    } // fi
  }

  public editUbicacion(): void {
    if (this.detalleUbicacionForm.valid) {
    }
  }

  public createsUbicacion(): void {}

  public deleteUbicacion(): void {}
}
