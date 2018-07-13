import { AuthService } from './../../core/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MooLoadingComponent, MooNotificationService } from 'ngx-moorea-components';
import { MatTableDataSource } from '@angular/material/table';
import { IndicacionesService } from '../indicaciones.service';

@Component({
  selector: 'app-generar-indicacion',
  templateUrl: './indicaciones-generar.component.html',
  styleUrls: ['./indicaciones-generar.component.css']
})
export class IndicacionesGenerarComponent implements OnInit {
  @ViewChild("loader") loader: MooLoadingComponent;
  public generarIndicacionForm: FormGroup;
  public pacientes: Paciente[] = [
    {
      dni: '37356501',
      nombre: 'Damián',
      apellido: 'Crespi',
      obraSocial: 'Osde 310',
      numeroAfiliado: '234234',
      internado: true
    }
  ]
  public medicamentos: Medicamento[] = [
    {
      nombre: 'Ibuprofeno 800',
      stockActual: 10,
      stockOptimo: 5
    },
    {
      nombre: 'Next 800',
      stockActual: 10,
      stockOptimo: 5
    }
  ]

  public unidadesTiempo: any[] = [
    { id: 'hora', text: 'Hora/s' },
    { id: 'minuto', text: 'Minuto/s' },
  ];
  public filteredMedicamentos: Observable<Medicamento[]>;
  public medicamentosForm: FormGroup;
  public medicamentosIndicados = new MatTableDataSource(
    [
      { cantidad: 23, frecuencia: 23, medicamento: "Ibuprofeno 800", unidad: "hora" }
    ]);
  public displayedColumns: string[] = ['medicamento', 'cantidad', 'frecuencia', 'unidad'];

  constructor(
    private FormBuilder: FormBuilder,
    private AuthService: AuthService,
    private NotificationService: MooNotificationService,
    private IndicacionesService: IndicacionesService
  ) {
    this.generarIndicacionForm = FormBuilder.group({
      paciente: new FormControl('', Validators.required),
      diagnostico: new FormControl('', Validators.required),
    })
    this.medicamentosForm = FormBuilder.group({
      medicamento: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      frecuencia: new FormControl('', Validators.required),
      unidad: new FormControl('', Validators.required),
    })
    this.filteredMedicamentos = this.medicamentosForm.get('medicamento').valueChanges
      .pipe(
        startWith(''),
        map(medicamento => medicamento ? this.filterMedicamento(medicamento) : this.medicamentos.slice())
      );
  }


  ngOnInit() {
  }

  generarIndicacion() {
    this.loader.show();
    if (this.generarIndicacionForm.valid) {
      let medicoId: string;
      this.AuthService.getUser().subscribe(user => medicoId = user.id);
      const indicacion = { ...this.generarIndicacionForm.value, medicamentos: this.medicamentosIndicados.data }
      console.log("About to generar indicación: ", indicacion);
      this.IndicacionesService.generar(indicacion)
        .subscribe(res => {
          this.loader.hide();
        })
    } else {
      this.NotificationService.error("Formulario inválido");
      this.loader.hide();
    }
  }

  filterMedicamento(name: string) {
    return this.medicamentos.filter(medicamento =>
      medicamento.nombre.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  agregarMedicamento(form: FormGroup) {
    console.log("Evnet: ", form);
    console.log("Form value: ", this.medicamentosForm.value);
    const data = this.medicamentosIndicados.data;
    data.push(this.medicamentosForm.value);
    this.medicamentosIndicados.data = data;
    console.log("Updated list: ", this.medicamentosIndicados);
  }

  cancelar() {
    //todo reset form
  }

}


interface Paciente {
  dni: string,
  nombre: string,
  apellido: string,
  obraSocial: string,
  numeroAfiliado: string,
  internado: boolean
}

interface Medicamento {
  nombre: string,
  stockActual: number,
  stockOptimo: number
}