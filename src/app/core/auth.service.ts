import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(
    // private http: HttpClient,
    private CookieService: CookieService
  ) { }

  private httpLogin(user: string, password: string) {
    if (environment.production) {
      
    } else {
      const response = {
        token: 'abee818d-9fa9-4a58-826a-1daa15f94863',
        user: {
          name: 'Pepe itaka',
          username: user,
          role: {
            id: 'farmaceutico',
            description: 'Farmaceutico'
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
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.CookieService.put('authToken', res.token);
        })
      )
  }
}
