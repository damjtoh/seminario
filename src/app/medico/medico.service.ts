import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient
  ) { }

  guardarIndicacion({ medicoId, indicacion }) {
    if (environment.production)
      return this.http.post(`${environment.BASE_URL}/medicos/indicaciones`, { medicoId, indicacion })
    else
      return of({ message: 'Éxito al generar la indicación' })
        .pipe(
          delay(3000)
        );
  }
}
