import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    CookieModule.forRoot(),
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [AuthService],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class CoreModule { }
