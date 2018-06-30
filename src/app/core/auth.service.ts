import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './models';

@Injectable()
export class AuthService {
  public userSubject = new BehaviorSubject<User>(this._getUser());
  constructor(
    // private http: HttpClient,
    private CookieService: CookieService,
    private Router: Router
  ) {
    // const user = JSON.parse(localStorage.getItem('user'))
    // if (user)
  }

  private _getUser(): User {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      return null;
    }
  }

  private httpLogin(user: string, password: string) {
    if (environment.production) {

    } else {
      const response = {
        token: 'abee818d-9fa9-4a58-826a-1daa15f94863',
        user: {
          id: 'abee818d-9fa9-4a58-826a-1daa15f94863',
          dni: '37356501',
          name: 'Pepe itaka',
          username: user,
          role: {
            id: 'medico',
            description: 'Médico'
          }
        }
      };
      return of(response).pipe(delay(5000));
    }
  }

  login(user: string, password: string) {
    return this.httpLogin(user, password)
      .pipe(
        map((res: any) => {
          const token = res.token;
          const user = res.user;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.CookieService.put('authToken', token);
          return res;
        })
      )
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.CookieService.removeAll();
    this.Router.navigate(['/login']);
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }
}