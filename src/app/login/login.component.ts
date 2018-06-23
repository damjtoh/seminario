import { AuthService } from './../core/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MooLoadingComponent } from 'ngx-moorea-components';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  login() {
    this.loader.show();
    const user = this.loginForm.get('user').value;
    const password = this.loginForm.get('password').value;
    this.AuthService.login(user, password)
      .subscribe(res => {
        this.router.navigate(['']);
      }, err =>{
        console.error("Error al autenticar: ", err);
        this.loader.hide()
      })
  }

}
