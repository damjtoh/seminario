import { AuthService } from './../../core/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MooLoadingComponent } from 'ngx-moorea-components';
import { MedicoService } from '../medico.service';

@Component({
  selector: 'app-generar-indicacion',
  templateUrl: './generar-indicacion.component.html',
  styleUrls: ['./generar-indicacion.component.css']
})
export class GenerarIndicacionComponent implements OnInit {
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

  public horas: any[] = [
    { id: 'hora', text: 'Hora/s' },
    { id: 'minuto', text: 'Minuto/s' },
  ];
  public filteredMedicamentos: Observable<Medicamento[]>;
  constructor(
    private FormBuilder: FormBuilder,
    private MedicoService: MedicoService,
    private AuthService: AuthService
  ) {
    this.generarIndicacionForm = FormBuilder.group({
      paciente: new FormControl('', Validators.required),
      diagnostico: new FormControl('', Validators.required),
      medicamento: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      frecuencia: new FormControl('', Validators.required),
      horas: new FormControl('', Validators.required),
    })
    this.filteredMedicamentos = this.generarIndicacionForm.get('medicamento').valueChanges
      .pipe(
        startWith(''),
        map(medicamento => medicamento ? this.filterMedicamento(medicamento) : this.medicamentos.slice())
      );
  }


  ngOnInit() {
  }

  generarIndicacion() {
    this.loader.show();
    let medicoId: string;
    this.AuthService.getUser().subscribe(user => medicoId = user.id);
    const indicacion = this.generarIndicacionForm.value
    this.MedicoService.guardarIndicación({medicoId, indicacion})
    .subscribe(res => {
      this.loader.hide();
    })
    console.log("About to generar indicación: ", this.generarIndicacionForm.value);
  }

  filterMedicamento(name: string) {
    return this.medicamentos.filter(medicamento =>
      medicamento.nombre.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  cancelar() {

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