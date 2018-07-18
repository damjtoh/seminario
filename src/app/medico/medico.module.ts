import { MatListModule } from '@angular/material/list';
import { medicoRoutes } from './medico.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from 'app/core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { MooLoadingModule, MooNotificationModule } from 'ngx-moorea-components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { IndicacionesModule } from '../indicaciones/indicaciones.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(medicoRoutes),
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
    MatTableModule,
    MooNotificationModule,
    IndicacionesModule
  ],
  declarations: []
})
export class MedicoModule { }
