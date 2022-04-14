import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'odst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent /*implements OnInit*/ {
  hide = true;
  loginForm = this.fb.group({
    // TODO: Reenable once password is implemented

    // userUsername: ['', Validators.required],
    // userPassword: ['', Validators.required],
    // rememberMe: ['', Validators.nullValidator],

    userUsername: [''],
    userPassword: [''],
    rememberMe: [''],
  });

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  // ngOnInit(): void {
  // }
  //TODO: Fix maybe if AuthGuards are required in front end login routing

  // submitLoginClick() {
  //   this.loginService.submitLogin(
  //     this.loginForm.value['userUsername'],
  //     this.loginForm.value['userPassword']
  //   );
  // }
}