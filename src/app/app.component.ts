import { AuthService } from './core/auth.service';
import { NotificationComponent } from './notification/notification.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval, of, Observable } from 'rxjs';
import { MatDialog } from '../../node_modules/@angular/material';
import { flatMap } from '../../node_modules/rxjs/operators';
import { environment } from 'environments/environment';
import { map } from '../../node_modules/rxjs-compat/operator/map';
import { User } from './core/models';


const _dosis = [{
  "id": 34,
  "fechaAplicacionPrevista": "Jul 18, 2018 01:18:20 PM",
  "aplicada": false,
  "itemIndicacion": {
    "id": 6,
    "medicamento": {
      "id": 2,
      "nombre": "Ibupirac",
      "stock": 290,
      "stockCompra": 350
    },
    "cantidad": 2,
    "frecuencia": 1.0
  },
  "paciente": {
    "id": 3,
    "dni": "5433453",
    "nombre": "Juan",
    "apellido": "Nieve",
    "obraSocial": "The Watch Medical Assistant",
    "internado": true,
    "fechaNacimiento": "Jan 13, 1981 12:00:00 AM",
    "numAfiliado": 883234
  }
},
{
  "id": 35,
  "fechaAplicacionPrevista": "Jul 18, 2018 4:40:30 PM",
  "aplicada": false,
  "itemIndicacion": {
    "id": 6,
    "medicamento": {
      "id": 2,
      "nombre": "Ibupirac",
      "stock": 290,
      "stockCompra": 350
    },
    "cantidad": 2,
    "frecuencia": 1.0
  },
  "paciente": {
    "id": 3,
    "dni": "5433453",
    "nombre": "Juan",
    "apellido": "Nieve",
    "obraSocial": "The Watch Medical Assistant",
    "internado": true,
    "fechaNacimiento": "Jan 13, 1981 12:00:00 AM",
    "numAfiliado": 883234
  }
}, {
  "id": 21,
  "fechaAplicacionPrevista": "Jul 18, 2018 4:44:35 PM",
  "aplicada": false,
  "itemIndicacion": {
    "id": 7,
    "medicamento": {
      "id": 2,
      "nombre": "Ibupirac",
      "stock": 290,
      "stockCompra": 350
    },
    "cantidad": 1,
    "frecuencia": 2.0
  },
  "paciente": {
    "id": 3,
    "dni": "5433453",
    "nombre": "Juan",
    "apellido": "Nieve",
    "obraSocial": "The Watch Medical Assistant",
    "internado": true,
    "fechaNacimiento": "Jan 13, 1981 12:00:00 AM",
    "numAfiliado": 883234
  }
}];

// const notifications = {
//   1: {
//     medicamento: 'Ibupirac',
//     cantidad: 3,
//     paciente: {
//       nombre: 'Pepe',
//       apellido: 'Itaka'
//     },
//     timer: setTimeout(() => )
//   }
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public notificationsDosis: any = {};

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private AuthService: AuthService
  ) { }

  // getDosis() {
  //   return this.http.get(``);
  // }

  ngOnInit() {
    this.AuthService.getUser()
      .subscribe((user: User) => {
        console.log("User: ", user);
        if (user.rol === 'ENFERMERO') {
          console.log("I'm an enfermero");
          interval(15000)
            .pipe(
              flatMap(() => this.getDosis()),
          ).subscribe((dosis: any[]) => {
            Object.keys(this.notificationsDosis).forEach(k => clearTimeout(this.notificationsDosis[k]['timer']));
            const dosisEnProx30Min = dosis
              .map(d => {
                const fechaPrevista = new Date(d.fechaAplicacionPrevista);
                console.log("Fecha prevista: ", fechaPrevista);
                console.log("Fecha actual", new Date())
                const difference = fechaPrevista.getTime() - new Date().getTime();
                return { ...d, difference: (difference > 0) ? difference : 0 };
              })
              .filter(d => {
                const millToMinutes = (mill) => Math.round(mill / 60000);
                console.log("Difference: ", millToMinutes(d.difference));
                return (millToMinutes(d.difference) <= 30)
              }).forEach(d => {
                if (this.notificationsDosis.hasOwnProperty(d.id)) {
                  if (this.notificationsDosis[d.id].ignore) return;
                  else {
                    this.notificationsDosis[d.id]['timer'] = setTimeout(() => this.openNotification(d), (d.difference - 900000));
                  }
                } else {
                  this.notificationsDosis[d.id] = { timer: setTimeout(() => this.openNotification(d), (d.difference - 900000)) }
                }
              })
            console.log("Dosis en los proximos 15 minutos: ", dosisEnProx30Min);
            console.log("notificationsDosis: ", this.notificationsDosis);

          })
        }
      })
    // this.openNotification(dosisEnProx15Min[0]);
  }

  getDosis(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BASE_URL}/dosis`)
  }

  openNotification(indicacion: any) {
    if (indicacion.opened) return;
    indicacion.opened = true;
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '60vw',
      data: indicacion
    }).afterClosed().subscribe(res => {
      this.notificationsDosis[indicacion.id]['ignore'] = true;
      console.log("notificationsDosis: ", this.notificationsDosis);
    })
  }
}
