import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { setRefreshToken, setAccessToken } from '@odst/helpers';
import {
  LoginMutationVariables,
  LoginMutation,
  LoginDocument,
} from '../../graphql-generated';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo, private router: Router) {}

  // TODO consider switching to sessionStorage
  // "What will happen if I'm logged in on multiple tabs?"; won't be authenticated in new tabs
  // https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

  // If SRR is implemented, will need to figure out how SSR plays into all of this

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
            this.router.navigate(['home']);
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
