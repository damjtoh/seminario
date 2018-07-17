import { AuthService } from './../core/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MooLoadingComponent } from 'ngx-moorea-components';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("loader") loader: MooLoadingComponent;
  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      mail: new FormControl('medico', Validators.required),
      password: new FormControl('123', Validators.required),
    });
  }

  ngOnInit() {
  }

  login() {
    this.loader.show();
    const mail = this.loginForm.get('mail').value;
    const password = this.loginForm.get('password').value;
    this.AuthService.login(mail, password)
      .subscribe((user: User) => {
        console.log("User: ", user);
        this.router.navigate([`/${user.rol.toLowerCase()}`]);
      }, err => {
        console.error("Error al autenticar: ", err);
        this.loader.hide()
      })
  }

}
