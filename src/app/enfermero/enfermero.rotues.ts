import { IndicacionesEnviadasComponent } from './../indicaciones/indicaciones-enviadas/indicaciones-enviadas.component';
import { RoleGuard } from './../core/role.guard';
import { LayoutComponent } from './../core/layout/layout.component';
import { Routes } from '@angular/router';
import { DosisComponent } from './dosis/dosis.component';

export const enfermeroRoutes: Routes = [
  {
    path: 'enfermero',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ENFERMERO'
    },
    children: [
      { path: '', redirectTo: 'indicaciones-enviadas', pathMatch: 'full' },
      { path: 'indicaciones-enviadas', component: IndicacionesEnviadasComponent, data: { title: 'Indicaciones enviadas' } },
      { path: 'dosis', component: DosisComponent, data: { title: 'Proximas dosis a suministrar' } },
    ]
  }
]