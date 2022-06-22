import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'odst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent /*implements OnInit*/ {
  // hide = true;
  // loginForm = this.fb.group({
  //   userUsername: ['', [Validators.required, Validators.email]],
  //   userPassword: ['', Validators.required],
  //   rememberMe: ['', Validators.nullValidator],
  // });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}
}
