import { farmaceuticoRoutes } from './farmaceutico.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicacionesPendientesComponent } from './indicaciones-pendientes/indicaciones-pendientes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(farmaceuticoRoutes),
  ],
  declarations: [IndicacionesPendientesComponent]
})
export class FarmaceuticoModule { }
