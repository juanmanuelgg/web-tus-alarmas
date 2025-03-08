import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Alarma from './alarma';

@Injectable({
  providedIn: 'root',
})
export class AlarmasService {
  constructor(private http: HttpClient) {}

  // TODO: Agregar parametros para paginación
  getAlarmas(): Observable<Alarma[]> {
    return this.http.get<Alarma[]>(`/api/alarmas.json`);
  }

  getAlarma(id: string): Observable<Alarma> {
    return this.getAlarmas().pipe(
      map((alarmas) => {
        for (const alarma of alarmas) {
          if (`${alarma.id}` === `${id}`) return alarma;
        }
        throw new Error(`not-found/${id}`);
      })
    );
  }
}
