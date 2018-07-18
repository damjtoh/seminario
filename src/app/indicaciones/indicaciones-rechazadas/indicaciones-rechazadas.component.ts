import { IndicacionesService } from './../../indicaciones/indicaciones.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MooLoadingComponent, MooNotificationService } from 'ngx-moorea-components';
import { EstadoIndicaciones } from '../../farmaceutico/farmaceutico.model';

const indicacionesRechazadas: any[] = [
  {
    codigoIndicacion: "1",
    paciente: {
      dni: '37356501',
      nombre: 'Damián',
      apellido: 'Crespi'
    },
    medico: {
      nombre: 'Damián',
      apellido: 'Crespi'
    },
    farmaceutico: {
      nombre: 'Damián',
      apellido: 'Crespi'
    },
    fechaCreacion: '10/1/2018',
    fechaValidacion: '10/1/2018'
  },
  {
    codigoIndicacion: "1",
    paciente: {
      dni: '37356501',
      nombre: 'Damián',
      apellido: 'Crespi'
    },
    medico: {
      nombre: 'Damián',
      apellido: 'Crespi'
    },
    farmaceutico: {
      nombre: 'Damián',
      apellido: 'Crespi'
    },
    fechaCreacion: '10/1/2018',
    fechaValidacion: '10/1/2018'
  },
]

@Component({
  selector: 'app-indicaciones-rechazadas',
  templateUrl: './indicaciones-rechazadas.component.html',
  styleUrls: ['./indicaciones-rechazadas.component.css']
})
export class IndicacionesRechazadasComponent implements OnInit {
  @ViewChild("loader") loader: MooLoadingComponent;
  public indicaciones: any[] = [];
  public displayedColumns: string[] = ['paciente', 'medico', 'fechaCreacion', 'farmaceutico', 'fechaValidacion', 'acciones'];
  constructor(
    private IndicacionesService: IndicacionesService,
    private NotificationService: MooNotificationService
  ) { }

  ngOnInit() {
    this.loader.show();
    this.IndicacionesService.obtenerPorEstado(EstadoIndicaciones.RECHAZADA)
      .subscribe(indicaciones => {
        console.log("Just recived indicaciones: ", indicaciones);
        this.indicaciones = indicaciones;
        this.loader.hide();
      }, () => {
        this.NotificationService.error("Ocurrió un error al obtener las indicaciones");
        this.loader.hide();
      });
  }

}
