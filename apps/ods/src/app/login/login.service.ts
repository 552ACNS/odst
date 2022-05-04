import { Injectable } from '@angular/core';
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
  constructor(private apollo: Apollo) {}
  submitLogin(username: string, password: string) {
    return this.apollo.mutate<LoginMutation, LoginMutationVariables>({
      mutation: LoginDocument,
      variables: {
        loginUserInput: {
          username: username,
          password: password, //TODO [ODST-136] hash password first, need to change backend too
        },
      },
    });
  }
}
