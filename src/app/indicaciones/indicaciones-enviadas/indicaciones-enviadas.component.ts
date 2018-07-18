import { Component, OnInit, ViewChild } from '@angular/core';
import { MooLoadingComponent, MooNotificationService } from 'ngx-moorea-components';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IndicacionesService } from '../../indicaciones/indicaciones.service';
import { EstadoIndicaciones } from '../../farmaceutico/farmaceutico.model';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-indicaciones-enviadas',
  templateUrl: './indicaciones-enviadas.component.html',
  styleUrls: ['./indicaciones-enviadas.component.css']
})
export class IndicacionesEnviadasComponent implements OnInit {
  @ViewChild("loader") loader: MooLoadingComponent;
  public indicaciones: any[] = [];
  public displayedColumns: string[] = ['medicamento', 'cantidad', 'frecuencia'];
  constructor(
    private IndicacionesService: IndicacionesService,
    private NotificationService: MooNotificationService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.obtenerIndicaciones();
  }

  obtenerIndicaciones() {
    this.loader.show();
    this.IndicacionesService.obtenerPorEstado(EstadoIndicaciones.ENVIADO)
      .pipe(
        map(indicaciones => indicaciones.map(i => ({ ...i, checked: false })))
      )
      .subscribe(indicaciones => {
        console.log("Indicaciones: ", indicaciones);
        this.indicaciones = indicaciones;
        this.loader.hide();
      }, () => {
        this.NotificationService.error("Ocurrió un error al obtener las indicaciones");
        this.loader.hide();
      });
  }

  aceptar(codigoIndicacion) {
    this.loader.show();
    this.IndicacionesService.aceptar(codigoIndicacion)
      .subscribe(
        (message: string) => {
          this.NotificationService.success("Indicación aceptada con éxito");
          this.obtenerIndicaciones()
        },
        (err: string) => this.NotificationService.error(err),
        () => this.loader.hide()
      );
  }

  rechazar(codigoIndicacion) {
    this.loader.show();
    this.IndicacionesService.rechazar(codigoIndicacion, null)
      .subscribe(
        (message: string) => {
          this.NotificationService.success("Indicación rechazada con éxito");
          this.obtenerIndicaciones()
        },
        (err: HttpErrorResponse) => {
          this.NotificationService.error(err.error || "Ocurrió un error al rechazar la indicación");
          this.loader.hide()
        });
      );
  }
  goToDashboard() {
    this.Router.navigate(['/']);
  }

}
