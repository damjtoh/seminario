import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../core/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
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
  public pacientes: Paciente[] = [];
  public medicamentos: Medicamento[] = [];
  // Edit stuff
  public isEditing: boolean = false;
  public currentEditIndex: number;
  // 
  public mode: 'MODIFY' | 'GENERATE' = 'MODIFY';
  public codigoIndicacion: string;
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
    private IndicacionesService: IndicacionesService,
    private route: ActivatedRoute
  ) {

    console.log("Snapshot: ", this.route.snapshot);
    this.mode = this.route.snapshot.data['mode'];

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
    if (this.mode === 'MODIFY') {
      this.loader.show();
      this.codigoIndicacion = this.route.params['codigoIndicacion'];
      this.displayedColumns.push('acciones');
      this.IndicacionesService.obtenerMedicamentos().subscribe((medicamentos: Medicamento[]) => this.medicamentos = medicamentos);
      this.IndicacionesService.obtenerPorCodigo('pepe')
        .pipe(map(indicacion => ({ ...indicacion, observacion: 'Alta observación', diagnostico: 'Alto diagnostico' })))
        .subscribe(indicacion => {
          console.log("Just got an indicacion: ", indicacion);
          this.generarIndicacionForm.addControl('observacion', new FormControl(indicacion.observacion));
          this.generarIndicacionForm.patchValue(indicacion)
          console.log("Form: ", this.generarIndicacionForm.controls);
          this.generarIndicacionForm.disable();
          this.loader.hide();
        })
    } else {
      this.loader.show();
      forkJoin(
        this.IndicacionesService.obtenerPacientes(),
        this.IndicacionesService.obtenerMedicamentos()
      ).subscribe(res => {
        const [pacientes, medicamentos] = res;
        this.pacientes = pacientes;
        this.medicamentos = medicamentos;
        this.loader.hide();
      })
    }
  }

  generarIndicacion() {
    if (this.medicamentosIndicados.data.length === 0) {
      this.NotificationService.error("Debe indicar por lo menos un medicamento");
      return;
    }
    this.loader.show();

    if (this.generarIndicacionForm.valid || this.generarIndicacionForm.disabled) {
      if (this.mode === 'GENERATE') {
        const indicacion = { ...this.generarIndicacionForm.value, medicamentos: this.medicamentosIndicados.data }
        console.log("About to generar indicación: ", indicacion);
        this.IndicacionesService.generar(indicacion)
          .subscribe(res => {
            this.loader.hide();
          })
      } else {
        this.IndicacionesService.modificarRechazada(this.codigoIndicacion, this.medicamentos)
          .subscribe(res => {
            this.loader.hide();
          })
      }
    } else {
      console.error("Error en el formuario: ", this.generarIndicacionForm);
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

  eliminarMedicamento(index: number) {
    const data = this.medicamentosIndicados.data;
    data.splice(index, 1);
    this.medicamentosIndicados.data = data;
  }

  editarMedicamento(index: number) {
    console.log("Index: ", index)
    this.currentEditIndex = index;
    const medicamentoOrignal = this.medicamentosIndicados.data[index];
    console.log("Medicamento to edit: ", medicamentoOrignal);
    this.medicamentosForm.patchValue(medicamentoOrignal);
    this.isEditing = true;
  }

  guardarEditarMedicamento() {
    if (this.medicamentosForm.valid) {
      let medicamentosList = this.medicamentosIndicados.data;
      medicamentosList[this.currentEditIndex] = this.medicamentosForm.value;
      this.medicamentosIndicados.data = medicamentosList;
      this.isEditing = false;
      this.medicamentosForm.reset({});

    } else this.NotificationService.error("Verifique que el formulario esté correctamente completado.");
  }
  cancelarEditarMedicamento() {
    this.medicamentosForm.reset({});
    this.isEditing = false;
  }

  cancelar() {
    //todo reset form
  }

}

export interface Indicacion {
  paciente: Paciente,
  diagnostico: string,
  medicamentos: ItemIndicacion[]
}


export interface Paciente {
  dni: string,
  nombre: string,
  apellido: string,
  obraSocial: string,
  numeroAfiliado: string,
  internado: boolean
}

export interface ItemIndicacion {
  medicamentoId: string,
  cantidad: number
  frecuencia: number
  unidad: string
}

export interface Medicamento {
  medicamentoId: string,
  nombre: string,
  stockActual: number,
  stockOptimo: number
}