import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'odst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent /*implements OnInit*/ {

  hide = true;
  loginForm = this.fb.group({
    userUsername: ['', Validators.required],
    userPassword: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  // ngOnInit(): void {
  // }

  submitLoginClick(): void {
    this.loginService.submitLogin(this.loginForm.value['userUsername'], this.loginForm.value['userPassword']);
  }

}
