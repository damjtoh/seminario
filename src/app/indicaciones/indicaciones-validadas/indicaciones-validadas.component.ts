import { Component, OnInit, ViewChild } from '@angular/core';
import { MooLoadingComponent, MooNotificationService } from 'ngx-moorea-components';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IndicacionesService } from '../../indicaciones/indicaciones.service';
import { EstadoIndicaciones } from '../../farmaceutico/farmaceutico.model';

@Component({
  selector: 'app-indicaciones-validadas',
  templateUrl: './indicaciones-validadas.component.html',
  styleUrls: ['./indicaciones-validadas.component.css']
})
export class IndicacionesValidadasComponent implements OnInit {
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
    this.IndicacionesService.obtener(EstadoIndicaciones.VALIDADO)
      .pipe(
        map(indicaciones => indicaciones.map(i => ({ ...i, checked: false })))
      )
      .subscribe(indicaciones => {
        console.log("Indicaciones: ", indicaciones);
        this.indicaciones = indicaciones;
        this.loader.hide();
      });
  }

  enviar() {
    console.log("Indicaciones: ", this.indicaciones);
    const codigosIndicaciones = this.indicaciones.filter(i => i.checked).map(i => i.codigoIndicacion);
    console.log("Codigos: ", codigosIndicaciones);
    if (codigosIndicaciones.length === 0) this.NotificationService.error("Debe seleccionar al menos una indicación");
    else {
      this.loader.show();
      this.IndicacionesService.enviar(codigosIndicaciones)
        .subscribe(
          (message: string) => {
            this.NotificationService.success(message);
            this.obtenerIndicaciones()
          },
          (err: string) => this.NotificationService.error(err),
          () => this.loader.hide()
        );
    }
  }
  goToDashboard() {
    this.Router.navigate(['/']);
  }

}