import { RoleGuard } from './../core/role.guard';
import { LayoutComponent } from './../core/layout/layout.component';
import { GenerarIndicacionComponent } from './generar-indicacion/generar-indicacion.component';
import { Routes } from '@angular/router';
export const medicoRoutes: Routes = [
  {
    path: 'medico',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'medico'
    },
    children: [
      { path: '', redirectTo: 'generar-indicacion', pathMatch: 'full' },
      { path: 'generar-indicacion', component: GenerarIndicacionComponent, data: {title: 'Generar indicación'} }
    ]
  }
]