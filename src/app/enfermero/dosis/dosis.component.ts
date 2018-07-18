import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MooNotificationService, MooLoadingComponent } from 'ngx-moorea-components';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IndicacionesService } from '../../indicaciones/indicaciones.service';
import { map, flatMap } from '../../../../node_modules/rxjs/operators';
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
      }, () => {
        this.NotificationService.error("Ocurrió un error al obtener las dosis");
        this.loader.hide();
      })
  }

  aplicar() {
    console.log("Dosis: ", this.dosis)
    const codigosDosis = this.dosis.filter(i => i.checked).map(i => i.id);
    if (codigosDosis.length === 0) {
      this.NotificationService.error("Debe seleccionar por lo menos una dosis a apllicar");
      return;
    }
    this.loader.show();
    console.log("Codigos Dosis: ", codigosDosis)
    from(codigosDosis)
      .pipe(
        flatMap(codigo => this.AuthService.getUser()
          .map((user: User) => ({ user, codigo }))),
        flatMap(({ user, codigo }) => this.http.post<any>(`${environment.BASE_URL}/dosis/${codigo}?email=${user.email}`, {}))
      ).subscribe(res => {
        this.NotificationService.success("Éxito al registrar las dosis");
        this.loader.hide();
        this.getDosis();
      }, () => {
        this.NotificationService.error("Ocurrió un error al aplicar la dosis");
        this.loader.hide();
      })
  }

  goToDashboard() {
    this.Router.navigate(['/']);
  }

}
