import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  public indicacion: any;
  public observacionesInput: FormControl = new FormControl(null);
  public displayedColumns: string[] = ['medicamento', 'cantidad', 'frecuencia'];
  constructor() { }

  ngOnInit() {
    this.indicacion = indicacion;
  }

}
