import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { LoginResponse } from '@odst/types';
import { hash } from 'bcrypt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo) {}

  // TODO consider switching to sessionStorage
  // "What will happen if I'm logged in on multiple tabs?"; won't be authenticated in new tabs
  // https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

  // TODO sessionStorage is not being cleared as expected

  // If SRR is implemented, will need to figure out how SSR plays into all of this
    getJwtToken() {
    return sessionStorage.getItem('jwt');
  }

  setJwtToken(token) {
    sessionStorage.setItem('jwt', token);
  }

  // TODO switch storing refreshtoken in localStorage so that session persists across sessions (if that is wanted)
  getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
  }

  setRefreshToken(token) {
    sessionStorage.setItem('refreshToken', token);
  }

  submitLogin(username: string, password: string): void {
    const LOGIN = gql`
      mutation Login($loginUserInput: LoginUserInput!) {
        login(loginUserInput: $loginUserInput) {
          user {
            id
            personId
            username
          }
          token
        }
      }
    `;
    this.apollo
      .mutate({
        mutation: LOGIN,
        variables: {
          loginUserInput: {
            username: username,
            password: password, //TODO hash password first, need to change backend too
          },
        },
      })
      .subscribe(
        ({ data }) => {
          const dataAny = data as any; //TODO make better
          const loginResponse = dataAny.login as LoginResponse;
          console.log(loginResponse.token)
          this.setJwtToken(loginResponse.token)
        },
        (error) => {
          alert(error);
        }
      );
  }
}
