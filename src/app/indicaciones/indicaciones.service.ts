import { AuthService } from './../core/auth.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of, Observable, from } from 'rxjs';
import { _throw } from 'rxjs/observable/throw'
import { delay, map, flatMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Paciente, Medicamento, Indicacion } from './indicaciones-generar/indicaciones-generar.component';
import { User } from '../core/models';

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
          medicamentoId: 1,
          cantidad: 23,
          frecuencia: 23,
          medicamento: "Ibuprofeno 800",
          unidad: "hora",
        },
        {
          medicamentoId: 2,
          cantidad: 5,
          frecuencia: 1,
          medicamento: "Next",
          unidad: "hora",
        },
      ]
    }
  ]
const pacientes = [
  {
    dni: '37356501',
    nombre: 'Damián',
    apellido: 'Crespi',
    obraSocial: 'Osde 310',
    numeroAfiliado: '234234',
    internado: true
  }
]

const medicamentos: Medicamento[] = [
  {
    medicamentoId: '1',
    nombre: 'Ibuprofeno 800',
    stockActual: 10,
    stockOptimo: 5
  },
  {
    medicamentoId: '2',
    nombre: 'Next 800',
    stockActual: 10,
    stockOptimo: 5
  }
];

@Injectable()
export class IndicacionesService {
  constructor(
    private http: HttpClient,
    private AuthService: AuthService
  ) { }
  obtenerPorEstado(estado): Observable<any[]> {
    let params = new HttpParams()
      .set('estado', estado);
    if (environment.production)
      return this.http.get<any[]>(`${environment.BASE_URL}/indicaciones/search`, { params })
    else
      return of(indicaciones)
        .pipe(
          delay(1000)
        );
  }

  obtenerPorCodigo(codigoIndicacion): Observable<any> {
    if (environment.production)
      return this.http.get(`${environment.BASE_URL}/indicaciones/${codigoIndicacion}`)
    else
      return of(indicaciones[0])
        .pipe(
          delay(3000)
        )
  }

  generar2(indicacion) {
    if (environment.production)
      return this.http.post(`${environment.BASE_URL}/indicaciones`, { ...indicacion })
    else
      return of('Éxito al generar la indicación')
        .pipe(
          delay(3000)
        )
  }


  generar(indicacion: Indicacion): Observable<any> {
    if (environment.production) {
      let postIndicacion = { dni: indicacion.paciente.dni, diag: indicacion.diagnostico };
      return this.http.put(`${environment.BASE_URL}/indicaciones`, postIndicacion)
        .pipe(
          flatMap((res: any) => this.http.post(`${environment.BASE_URL}/indicaciones/${res.codigoIndicacion}/items`, indicacion.medicamentos)),
          flatMap((res: any) => {
            return this.AuthService.getUser()
              .toPromise()
              .then((user: User) => {
                const email = user.email;
                return this.http.put(`${environment.BASE_URL}/indicaciones/${res.codigoIndicacion}?email=${email}`, {})
              })
          })
        )
    }
    else
      return of('Éxito al generar la indicación')
        .pipe(
          delay(3000)
        )
  }

  modificarRechazada(codigoIndicacion: string, medicamentos: any[]) {
    if (environment.production) {
      return this.http.post(`${environment.BASE_URL}/indicaciones/${codigoIndicacion}`, { medicamentos })
    } else {
      return of('Éxito al generar la indicación')
        .pipe(
          delay(3000)
        )
    }
  }


  validar(codigoIndicacion) {
    if (environment.production) {
      return this.AuthService.getUser()
        .toPromise()
        .then((user: User) => {
          const email = user.email;
          return this.http.put(`${environment.BASE_URL}/indicaciones/${codigoIndicacion}/validate?email=${email}`, {})
        })
    } else
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

  enviar(codigosIndicaciones: string[]): Observable<any> {
    if (environment.production) {
      return from(codigosIndicaciones)
        .pipe(
          map(codigo => this.http.post<any[]>(`${environment.BASE_URL}/indicaciones/${codigo}/send`, {}))
        )
    }
    else
      return of('Éxito al enviar las indicaciones')
        .pipe(
          delay(1000)
        );
  }
  aceptar(codigosIndicaciones: string[]): Observable<any> {
    if (environment.production) {
      this.AuthService.getUser()
        .toPromise()
        .then((user: User) => {
          const email = user.email;
          return from(codigosIndicaciones)
            .pipe(
              map(codigo => this.http.post<any>(`${environment.BASE_URL}/indicaciones/${codigo}/accept?email=${email}`, {}))
            )
        });
    }
    else
      return of('Éxito al enviar las indicaciones')
        .pipe(
          delay(1000)
        );
  }

  //  Pacientes

  obtenerPacientes(): Observable<Paciente[]> {
    if (environment.production)
      return this.http.get<any[]>(`${environment.BASE_URL}/pacientes`)
    else
      return of(pacientes)
        .pipe(
          delay(1000)
        );
  }

  obtenerMedicamentos(): Observable<Medicamento[]> {
    if (environment.production)
      return this.http.get<any[]>(`${environment.BASE_URL}/medicamentos`)
    else
      return of(medicamentos)
        .pipe(
          delay(1000)
        );
  }
}