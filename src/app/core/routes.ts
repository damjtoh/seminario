import { LayoutComponent } from './layout/layout.component';
import { Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { RoleGuard } from './role.guard';


export const routes: Routes = [
  {
    path: 'login',
    canActivate: [RoleGuard],
    component: LoginComponent
  },
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
   }
] 