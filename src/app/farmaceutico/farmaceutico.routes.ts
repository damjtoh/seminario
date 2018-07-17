import { RoleGuard } from './../core/role.guard';
import { LayoutComponent } from './../core/layout/layout.component';
import { Routes } from '@angular/router';
import { IndicacionesPendientesComponent } from '../indicaciones/indicaciones-pendientes/indicaciones-pendientes.component';
import { IndicacionesValidadasComponent } from '../indicaciones/indicaciones-validadas/indicaciones-validadas.component';
import { IndicacionesValidarComponent } from '../indicaciones/indicaciones-validar/indicaciones-validar.component';
export const farmaceuticoRoutes: Routes = [
  {
    path: 'farmaceutico',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'FARMACEUTICO'
    },
    children: [
      { path: '', redirectTo: 'indicaciones-pendientes', pathMatch: 'full' },
      { path: 'indicaciones-pendientes', component: IndicacionesPendientesComponent, data: { title: 'Indicaciones pendientes' } },
      { path: 'indicaciones-validadas', component: IndicacionesValidadasComponent, data: { title: 'Indicaciones validadas' } },
      { path: 'indicaciones/:codigoIndicacion/validar', component: IndicacionesValidarComponent, data: { title: 'Validar indicación' } }
    ]
  }
]