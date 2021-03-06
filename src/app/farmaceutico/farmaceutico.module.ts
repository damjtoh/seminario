import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { farmaceuticoRoutes } from './farmaceutico.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '../../../node_modules/@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '../../../node_modules/@angular/forms';
import { MooLoadingModule, MooNotificationModule } from '../../../node_modules/ngx-moorea-components';
import { MatCheckboxModule } from '../../../node_modules/@angular/material';
import { IndicacionesModule } from '../indicaciones/indicaciones.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(farmaceuticoRoutes),
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
    IndicacionesModule
  ],
  declarations: []
})
export class FarmaceuticoModule { }
