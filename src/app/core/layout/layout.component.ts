import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public user: Observable<User>;
  public title: string = 'Cargando...';
  constructor(
    private AuthService: AuthService,
    private route: ActivatedRoute
  ) {
    this.user = AuthService.getUser();
    console.log("Route: ", route);
    route.children[0].data.subscribe(res => this.title = res.title);
  }

  ngOnInit() {
  }

  logout() {
    this.AuthService.logout();
  }

}
