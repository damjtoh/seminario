import { IndicacionesService } from './../../indicaciones/indicaciones.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MooLoadingComponent } from '../../../../node_modules/ngx-moorea-components';
import { EstadoIndicaciones } from '../../farmaceutico/farmaceutico.model';

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
    private IndicacionesService: IndicacionesService
  ) { }

  ngOnInit() {
    this.loader.show();
    this.IndicacionesService.obtener(EstadoIndicaciones.PENDIENTE)
      .subscribe(indicaciones => {
        this.indicaciones = indicaciones;
        this.loader.hide();
      });
  }

}
