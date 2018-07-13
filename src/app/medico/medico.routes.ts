import { IndicacionesRechazadasComponent } from './../indicaciones/indicaciones-rechazadas/indicaciones-rechazadas.component';
import { RoleGuard } from './../core/role.guard';
import { LayoutComponent } from './../core/layout/layout.component';
import { Routes } from '@angular/router';
import { IndicacionesGenerarComponent } from '../indicaciones/indicaciones-generar/indicaciones-generar.component';
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
      { path: 'generar-indicacion', component: IndicacionesGenerarComponent, data: {title: 'Generar indicación'} },
      { path: 'indicaciones-rechazadas', component: IndicacionesRechazadasComponent, data: { title: 'Indicaciones rechazadas' } },
    ]
  }
]