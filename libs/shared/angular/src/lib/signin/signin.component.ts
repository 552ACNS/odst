import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {}

  submitLoginClick() {
    // this.loginService.submitLogin(
    //   this.signinForm.value['userUsername'],
    //   this.signinForm.value['userPassword']
    // );
  }
}
