import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { setAccessToken, setRefreshToken } from '@odst/helpers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'odst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm = this.fb.group({
    userEmail: ['', [Validators.required, Validators.email]],
    userPassword: ['', Validators.required],
    rememberMe: ['', Validators.nullValidator],
  });

  returnUrl: string;

  passwordError = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      this.returnUrl = params['returnUrl'] || '/dashboard';
    });
  }

  submitLoginClick() {
    this.loginService
      .submitLogin(
        this.loginForm.value['userEmail'],
        this.loginForm.value['userPassword']
      )
      .subscribe(({ data, errors, loading }) => {
        if (loading) {
          this.passwordError = false;
        }
        if (errors) {
          this.passwordError = true;
        }
        if (data) {
          setAccessToken(data.login.accessToken);
          // if (this.loginForm.value['rememberMe']) {
          setRefreshToken(data.login.refreshToken);
          // TODO: if remember me is false, it should get a refreshToken with a low time to live
          // if it's true, it should get a refreshToken with a high time to live
          // }

          this.router.navigate(['dashboard']);
        }
        //added allow list with defined acceptable results
        const allowList = ['/dashboard', '/login'];
        if (allowList.indexOf(this.returnUrl) > -1) {
          this.router.navigateByUrl(this.returnUrl);
        }
      });
  }
}
