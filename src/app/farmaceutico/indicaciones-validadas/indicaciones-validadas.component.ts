import { indicaciones } from './../indicaciones-pendientes/indicaciones-pendientes.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MooLoadingComponent, MooNotificationService } from '../../../../node_modules/ngx-moorea-components';
import { FarmaceuticoService } from '../farmaceutico.service';
import { EstadoIndicaciones } from '../farmaceutico.model';
import { map } from '../../../../node_modules/rxjs/operators';
import { Router } from '../../../../node_modules/@angular/router';
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
    private FarmaceuticoService: FarmaceuticoService,
    private NotificationService: MooNotificationService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.obtenerIndicaciones();
  }

  obtenerIndicaciones() {
    this.loader.show();
    this.FarmaceuticoService.obtenerIndicaciones(EstadoIndicaciones.VALIDADO)
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
      this.FarmaceuticoService.enviarIndicaciones(codigosIndicaciones)
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
