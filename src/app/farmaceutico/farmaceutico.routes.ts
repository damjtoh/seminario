import { IndicacionesPendientesComponent } from './indicaciones-pendientes/indicaciones-pendientes.component';
import { RoleGuard } from './../core/role.guard';
import { LayoutComponent } from './../core/layout/layout.component';
import { Routes } from '@angular/router';
export const farmaceuticoRoutes: Routes = [
  {
    path: 'farmaceutico',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'farmaceutico'
    },
    children: [
      { path: '', redirectTo: 'indicaciones-pendientes', pathMatch: 'full' },
      { path: 'indicaciones-pendientes', component: IndicacionesPendientesComponent, data: { title: 'Indicaciones pendientes' } }
    ]
  }
]