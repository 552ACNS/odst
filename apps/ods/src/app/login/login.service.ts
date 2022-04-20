import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from './login.generated';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo, private router: Router) {}
  //submitLogin(username: string, password: string): void {}
}
