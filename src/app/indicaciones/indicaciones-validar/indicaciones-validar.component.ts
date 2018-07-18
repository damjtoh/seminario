import { Router, ActivatedRoute } from '@angular/router';
import { MooNotificationService, MooLoadingComponent } from 'ngx-moorea-components';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndicacionesService } from '../../indicaciones/indicaciones.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

const indicacion: any = {
  codigoIndicacion: "1",
  paciente: {
    dni: '37356501',
    nombre: 'Damián',
    apellido: 'Crespi'
  },
  diagnostico: "Esto es un diagnostico super hiper mega largo super hiper mega largo super hiper mega largo super hiper mega largo super hiper mega largo super hiper mega largo",
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

@Component({
  selector: 'app-indicaciones-validar',
  templateUrl: './indicaciones-validar.component.html',
  styleUrls: ['./indicaciones-validar.component.css']
})
export class IndicacionesValidarComponent implements OnInit {
  @ViewChild("loader") loader: MooLoadingComponent;
  public indicacion: any;
  public observacionesInput: FormControl = new FormControl(null);
  public displayedColumns: string[] = ['medicamento', 'cantidad', 'frecuencia'];
  public codigoIndicacion: string;
  constructor(
    private IndicacionesService: IndicacionesService,
    private NotificationService: MooNotificationService,
    private Router: Router,
    private route: ActivatedRoute
  ) {
    this.codigoIndicacion = route.snapshot.params['codigoIndicacion'];
  }

  ngOnInit() {
    this.loader.show();
    this.IndicacionesService.obtenerPorCodigo(this.codigoIndicacion)
      .subscribe(indicacion => {
        this.indicacion = indicacion;
        this.loader.hide();
      });
  }

  validar() {
    this.loader.show();
    this.IndicacionesService.validar(this.codigoIndicacion)
      .subscribe((message: string) => {
        console.log("Message: ", message);
        this.NotificationService.success("Éxito al validar indicación");
        this.goToDashboard()
        this.loader.hide()
      },
        (err: HttpErrorResponse) => {
          this.NotificationService.error(err.error)
          this.loader.hide()
        }
      );
  }

  rechazar() {
    if (!this.observacionesInput.value) {
      this.NotificationService.error('Debe indicar una observacion para rechazar esta indicación.');
      return;
    }
    this.loader.show();
    this.IndicacionesService.rechazar(this.indicacion.codigoIndicacion, this.observacionesInput.value)
      .subscribe(
        (message: string) => {
          this.NotificationService.success("Indicación rechazada con éxito")
          this.goToDashboard()
          this.loader.hide()
        },
        (err: any) => {
          this.NotificationService.error(err.error);
          this.loader.hide()
        }
      );
  }

  goToDashboard() {
    this.Router.navigate(['/']);
  }

}
