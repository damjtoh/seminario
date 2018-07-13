import { IndicacionesRechazadasComponent } from './indicaciones-rechazadas/indicaciones-rechazadas.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IndicacionesValidadasComponent } from './indicaciones-validadas/indicaciones-validadas.component';
import { MooLoadingModule, MooNotificationModule } from 'ngx-moorea-components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicacionesService } from './indicaciones.service';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatAutocompleteModule, MatListModule } from '@angular/material';
import { IndicacionesPendientesComponent } from './indicaciones-pendientes/indicaciones-pendientes.component';
import { IndicacionesGenerarComponent } from './indicaciones-generar/indicaciones-generar.component';
import { IndicacionesValidarComponent } from './indicaciones-validar/indicaciones-validar.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    IndicacionesGenerarComponent,
    IndicacionesPendientesComponent,
    IndicacionesValidadasComponent,
    IndicacionesValidarComponent,
    IndicacionesRechazadasComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MooLoadingModule,
    MooNotificationModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MooLoadingModule,
    ReactiveFormsModule,
    CoreModule,
    MatSelectModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatListModule,
    RouterModule
  ],
  exports: [],
  providers: [IndicacionesService],
})
export class IndicacionesModule {

}