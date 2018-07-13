import { IndicacionesService } from './../../indicaciones/indicaciones.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MooLoadingComponent } from '../../../../node_modules/ngx-moorea-components';
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
    private IndicacionesService: IndicacionesService
  ) { }

  ngOnInit() {
    this.loader.show();
    this.IndicacionesService.obtener(EstadoIndicaciones.RECHAZADA)
      .subscribe(indicaciones => {
        this.indicaciones = indicacionesRechazadas;
        this.loader.hide();
      });
  }

}