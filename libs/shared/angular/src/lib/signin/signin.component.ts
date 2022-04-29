import { Component, Inject, SkipSelf } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceInterface } from './interfaces/signin-interface';
import { LOGIN_SERVICE } from './signin.constants';
@Component({
  selector: 'odst-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  hide = true;
  signinForm = this.fb.group({
    userUsername: ['', Validators.required],
    userPassword: ['', Validators.required],
    rememberMe: ['', Validators.nullValidator],
  });

  constructor(
    private fb: FormBuilder,
    @SkipSelf()
    @Inject(LOGIN_SERVICE)
    private loginService: LoginServiceInterface
  ) {
    console.log(loginService);
  }

  submitLoginClick() {
    console.log(this.loginService);

    //why do I have to instantiate loginService here?

    this.loginService.submitLogin(
      this.signinForm.value['userUsername'],
      this.signinForm.value['userPassword'],
      this.signinForm.value['rememberMe']
    );
  }
}
