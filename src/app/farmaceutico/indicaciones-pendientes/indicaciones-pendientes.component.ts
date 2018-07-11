import { FarmaceuticoService  FarmaceuticoService } from './../farmaceutico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadoIndicaciones } from '../farmaceutico.model';
import { MooLoadingComponent } from '../../../../node_modules/ngx-moorea-components';

export const indicaciones: any[] =
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

@Component({
  selector: 'app-indicaciones-pendientes',
  templateUrl: './indicaciones-pendientes.component.html',
  styleUrls: ['./indicaciones-pendientes.component.css']
})
export class IndicacionesPendientesComponent implements OnInit {
  @ViewChild("loader") loader: MooLoadingComponent;
  public indicaciones: any[] = [];
  public displayedColumns: string[] = ['medicamento', 'cantidad', 'frecuencia'];
  constructor(
    private FarmaceuticoService: FarmaceuticoService
  ) { }

  ngOnInit() {
    this.loader.show();
    this.FarmaceuticoService.obtenerIndicaciones(EstadoIndicaciones.PENDIENTE)
      .subscribe(indicaciones => {
        this.indicaciones = indicaciones;
        this.loader.hide();
      });
  }

}
