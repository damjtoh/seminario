import { MatListModule } from '@angular/material/list';
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
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { MatDividerModule } from '@angular/material/divider';


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
    MatListModule,
    MatDividerModule
  ],
  providers: [AuthService],
  declarations: [LayoutComponent, NavMenuComponent],
  exports: [LayoutComponent]
})
export class CoreModule { }
