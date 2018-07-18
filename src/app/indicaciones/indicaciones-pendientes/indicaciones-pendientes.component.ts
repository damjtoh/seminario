import { IndicacionesService } from './../../indicaciones/indicaciones.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MooLoadingComponent, MooNotificationService } from '../../../../node_modules/ngx-moorea-components';
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
    private IndicacionesService: IndicacionesService,
    private NotificationService: MooNotificationService
  ) { }

  ngOnInit() {
    this.loader.show();
    this.IndicacionesService.obtenerPorEstado(EstadoIndicaciones.PENDIENTE)
      .subscribe(indicaciones => {
        this.indicaciones = indicaciones;
        this.loader.hide();
      }, () => {
        this.NotificationService.error("Ocurrió un error al obtener las indicaciones");
        this.loader.hide();
      });
  }

}
