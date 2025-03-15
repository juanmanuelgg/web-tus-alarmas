import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Ubicacion from './ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  constructor(private http: HttpClient) { }

  // TODO: Agregar parametros para paginación
  getUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`/api/ubicaciones.json`);
  }

  getUbicacion(id: string): Observable<Ubicacion> {
    return this.getUbicaciones().pipe(
      map((ubicaciones) => {
        for (const ubicacion of ubicaciones) {
          if (`${ubicacion.id}` === `${id}`) return ubicacion;
        }
        throw new Error(`not-found/${id}`);
      })
    );
  }
}
