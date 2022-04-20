import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { setAccessToken, setRefreshToken } from '@odst/helpers';
import { Apollo } from 'apollo-angular';
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from '../../graphql-generated';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo, private router: Router) {}
  submitLogin(username: string, password: string): void {
    this.apollo
      .mutate<LoginMutation, LoginMutationVariables>({
        mutation: LoginDocument,
        variables: {
          loginUserInput: {
            username: username,
            password: password, //TODO [ODST-136] hash password first, need to change backend too
          },
        },
      })
      .subscribe(
        //TODO [ODST-135] deprecated
        ({ data }) => {
          if (data) {
            setAccessToken(data.login.accessToken);
            setRefreshToken(data.login.refreshToken);
            this.router.navigate(['dashboard']);
          }
        },
        () => {
          //alert(error);
          //this.router.navigate(['login'])
          alert('Username or Password was incorrect');
        }
      );
  }
}
