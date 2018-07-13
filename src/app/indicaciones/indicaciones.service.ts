import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

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

@Injectable()
export class IndicacionesService {
  constructor(
    private http: HttpClient,
  ) { }
  obtener(estado): Observable<any[]> {
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

  generar(indicacion) {
    if (environment.production)
      return this.http.post(`${environment.BASE_URL}/indicaciones`, { ...indicacion })
    else
      return of('Éxito al generar la indicación')
        .pipe(
          delay(3000)
        )
  }
  validar(codigoIndicacion) {
    if (environment.production)
      return this.http.put(`${environment.BASE_URL}/indicaciones/${codigoIndicacion}`, { estado: 'VALIDADO' })
    else
      return of('Éxito al validar la indicación')
        .pipe(
          delay(1000)
        );
  }
  rechazar(codigoIndicacion, observacion) {
    if (environment.production)
      return this.http.put(`${environment.BASE_URL}/indicaciones/${codigoIndicacion}`, { observacion, estado: 'RECHAZADO' })
    else
      return of('Éxito al rechazar la indicación')
        .pipe(
          delay(1000)
        );
  }

  enviar(codigosIndicaciones: any[]): Observable<any> {
    if (environment.production)
      return this.http.put<any[]>(`${environment.BASE_URL}/indicaciones/enviar`, { codigosIndicaciones })
    else
      return of('Éxito al enviar las indicaciones')
        .pipe(
          delay(1000)
        );
  }
}