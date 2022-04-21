import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { setAccessToken, setRefreshToken } from '@odst/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'odst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent /*implements OnInit*/ {
  hide = true;
  loginForm = this.fb.group({
    userUsername: ['', Validators.required],
    userPassword: ['', Validators.required],
    rememberMe: ['', Validators.nullValidator],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  submitLoginClick() {
    this.loginService
      .submitLogin(
        this.loginForm.value['userUsername'],
        this.loginForm.value['userPassword']
      )
      .subscribe(({ data, errors }) => {
        if (errors) {
          alert('Username or Password was incorrect');
        }
        if (data) {
          setAccessToken(data.login.accessToken);
          if (this.loginForm.value['rememberMe']) {
            setRefreshToken(data.login.refreshToken);
          }

          this.router.navigate(['dashboard']);
        }
      });
  }
}
