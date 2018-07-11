import { Router } from '@angular/router';
import { MooNotificationService, MooLoadingComponent } from 'ngx-moorea-components';
import { FarmaceuticoService } from './../farmaceutico.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

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
  constructor(
    private FarmaceuticoService: FarmaceuticoService,
    private NotificationService: MooNotificationService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.indicacion = indicacion;
  }

  validar() {
    this.loader.show();
    this.FarmaceuticoService.validar(this.indicacion.codigoIndicacion)
      .subscribe(
        (message: string) => {
          this.NotificationService.success(message);
          this.goToDashboard()
        },
        (err: string) => this.NotificationService.error(err),
        () => this.loader.hide()
      );
    }
    
    rechazar() {
      this.loader.show();
      if (!this.observacionesInput.value) this.NotificationService.error('Debe indicar una observacion para rechazar esta indicación.'),
      this.FarmaceuticoService.rechazar(this.indicacion.codigoIndicacion, this.observacionesInput.value)
      .subscribe(
        (message: string) => {
          this.NotificationService.success(message)
          this.goToDashboard()
        },
        (err: string) => this.NotificationService.error(err),
        () => this.loader.hide()
      );
  }

  goToDashboard() {
    this.Router.navigate(['/']);
  }

}
