import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MooLoadingModule, MooNotificationModule } from 'ngx-moorea-components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { enfermeroRoutes } from './enfermero.rotues';
import { DosisComponent } from './dosis/dosis.component';
import { CoreModule } from '../core/core.module';
import { IndicacionesModule } from '../indicaciones/indicaciones.module';
import { MatListModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [DosisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(enfermeroRoutes),
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
    IndicacionesModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports: [],
  providers: [],
})
export class EnfermeroModule { }