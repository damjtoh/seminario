import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MooNotificationService, MooLoadingComponent } from 'ngx-moorea-components';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndicacionesService } from '../../indicaciones/indicaciones.service';
import { map } from '../../../../node_modules/rxjs/operators';
import { from } from '../../../../node_modules/rxjs';
import { User } from '../../core/models';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dosis',
  templateUrl: './dosis.component.html',
  styleUrls: ['./dosis.component.css']
})
export class DosisComponent implements OnInit {
  @ViewChild("loader") loader: MooLoadingComponent;
  public dosis: any[] = [];
  public displayedColumns: string[] = ['seleccion', 'paciente', 'medicamento', 'cantidad', 'hora'];

  constructor(
    private IndicacionesService: IndicacionesService,
    private NotificationService: MooNotificationService,
    private Router: Router,
    private http: HttpClient,
    private AuthService: AuthService
  ) { }

  ngOnInit() {
    this.getDosis();
  }

  getDosis() {
    this.loader.show();
    return this.http.get(`${environment.BASE_URL}/dosis`)
      .subscribe((dosis: any[]) => {
        console.log("Dosis:", dosis);
        this.dosis = dosis;
        this.loader.hide();
      })
  }

  aplicar() {
    this.loader.show();
    const codigosDosis = this.dosis.filter(i => i.checked).map(i => i.codigoDosis);
    return this.AuthService.getUser()
      .toPromise()
      .then((user: User) => {
        const email = user.email;
        from(codigosDosis)
          .pipe(
            map(codigo => this.http.post<any>(`${environment.BASE_URL}/dosis/${codigo}/email=${email}`, {}))
          ).subscribe(res => {
            this.NotificationService.success("Éxito al registrar las dosis");
            this.loader.hide();
            this.getDosis();
          })
      });
  }

  goToDashboard() {
    this.Router.navigate(['/']);
  }

}
