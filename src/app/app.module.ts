import { routes } from './core/routes';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { MedicoModule } from './medico/medico.module';
import { MatSelectModule } from '@angular/material/select';
import { MooNotificationModule } from 'ngx-moorea-components';
import { FarmaceuticoModule } from './farmaceutico/farmaceutico.module';
import { EnfermeroModule } from './enfermero/enfermero.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    LoginModule,
    MatIconModule,
    MedicoModule,
    MatSelectModule,
    MooNotificationModule.forRoot(),
    FarmaceuticoModule,
    EnfermeroModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
