import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private AuthService: AuthService,
    private Router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.AuthService.getUser()
      .pipe(
        map((user: User) => {
          console.log("Guard user: ", user);
          const isLogged = !!(user !== null)
          console.log("Is logged in: ", isLogged);
          console.log("Route: ", route);
          if (!isLogged) {
            if (route.routeConfig.path === 'login') return true;
            this.Router.navigate(['/login']);
            return false;
          } else {
            const expectedRole = route.data.expectedRole;
            if (user.role.id !== expectedRole) {
              this.Router.navigate([`/${user.role.id}`]);
              return false;
            } else {
              return true;
            }
          }
        })
      )
  }
}
