import { delay } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from '../../../node_modules/rxjs';



@Injectable({
  providedIn: 'root'
})
export class FarmaceuticoService {

  constructor(
    private http: HttpClient
  ) { }

  
}
