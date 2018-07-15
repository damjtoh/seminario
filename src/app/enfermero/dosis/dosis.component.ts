import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MooNotificationService, MooLoadingComponent } from 'ngx-moorea-components';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndicacionesService } from '../../indicaciones/indicaciones.service';

@Component({
  selector: 'app-dosis',
  templateUrl: './dosis.component.html',
  styleUrls: ['./dosis.component.css']
})
export class DosisComponent implements OnInit {
  @ViewChild("loader") loader: MooLoadingComponent;
  public dosis:any[] =[
    {
      paciente: {
        dni: '37356501',
        nombre: 'Damián',
        apellido: 'Crespi'
      },
      medicamento: 'Ibuprofeno 800',
      cantidad: 1,
      hora: '12:00'
    }
  ];
  public displayedColumns: string[] = ['seleccion', 'paciente', 'medicamento', 'cantidad', 'hora'];

  constructor(
    private IndicacionesService: IndicacionesService,
    private NotificationService: MooNotificationService,
    private Router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  getDosis() {
    return this.http.get(`${environment.BASE_URL}`)
  }

}
