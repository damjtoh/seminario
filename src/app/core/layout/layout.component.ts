import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = AuthService.getUser();
    router.events.subscribe
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.title = route.snapshot.firstChild.data.title;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.AuthService.logout();
  }

}
