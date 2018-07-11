import { delay } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from '../../../node_modules/rxjs';

const indicaciones: any[] =
  [
    {
      codigoIndicacion: "1",
      paciente: {
        dni: '37356501',
        nombre: 'Damián',
        apellido: 'Crespi'
      },
      medicamentos: [
        {
          cantidad: 23,
          frecuencia: 23,
          medicamento: "Ibuprofeno 800",
          unidad: "hora",
        },
        {
          cantidad: 5,
          frecuencia: 1,
          medicamento: "Next",
          unidad: "hora",
        },
      ]
    },
    {
      codigoIndicacion: "2",
      paciente: {
        dni: '37356501',
        nombre: 'Damián',
        apellido: 'Crespi'
      },
      medicamentos: [
        {
          cantidad: 23,
          frecuencia: 23,
          medicamento: "Ibuprofeno 800",
          unidad: "hora",
        },
        {
          cantidad: 5,
          frecuencia: 1,
          medicamento: "Next",
          unidad: "hora",
        },
      ]
    }
  ]

@Injectable({
  providedIn: 'root'
})
export class FarmaceuticoService {

  constructor(
    private http: HttpClient
  ) { }

  validar(codigoIndicacion) {
    if (environment.production)
      return this.http.put(`${environment.BASE_URL}/indicaciones/${codigoIndicacion}/validar`, { estado: 'VALIDADO' })
    else
      return of('Éxito al validar la indicación')
        .pipe(
          delay(1000)
        );
  }
  rechazar(codigoIndicacion, observacion) {
    if (environment.production)
      return this.http.put(`${environment.BASE_URL}/indicaciones/${codigoIndicacion}/rechazar`, { observacion, estado: 'RECHAZADO' })
    else
      return of('Éxito al rechazar la indicación')
        .pipe(
          delay(1000)
        );
  }

  obtenerIndicaciones(estado): Observable<any[]> {
    let params = new HttpParams()
      .set('estado', estado);
    if (environment.production)
      return this.http.get<any[]>(`${environment.BASE_URL}/indicaciones`, { params })
    else
      return of(indicaciones)
        .pipe(
          delay(1000)
        );
  }

  enviarIndicaciones(codigosIndicaciones: any[]): Observable<any> {
    if (environment.production)
    return this.http.put<any[]>(`${environment.BASE_URL}/indicaciones/enviar`, { codigosIndicaciones })
  else
    return of('Éxito al enviar las indicaciones')
      .pipe(
        delay(1000)
      );
  }
}
