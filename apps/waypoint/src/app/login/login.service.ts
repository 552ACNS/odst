import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { TokensGQL } from '@odst/types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo) {}

  // TODO consider switching to sessionStorage
  // "What will happen if I'm logged in on multiple tabs?"; won't be authenticated in new tabs
  // https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

  // If SRR is implemented, will need to figure out how SSR plays into all of this
  getAccessToken() {
    return sessionStorage.getItem('accessToken');
  }

  setAccessToken(token) {
    sessionStorage.setItem('accessToken', token);
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
          accessToken
          refreshToken
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
          const tokens = dataAny.login as TokensGQL;
          console.log(tokens);
          this.setAccessToken(tokens.accessToken);
          this.setRefreshToken(tokens.refreshToken);
        },
        (error) => {
          alert(error);
        }
      );
  }

  submitRefresh(): void {
    const REFRESH = gql`
      mutation refresh {
        refresh {
          accessToken
          refreshToken
        },
      }
    `;
    this.apollo
      .mutate({
        mutation: REFRESH,
        context: {
          headers: {
            Authorization: `Bearer ${this.getRefreshToken()}`,
          }
        }
      })
      .subscribe(
        ({ data }) => {
          const dataAny = data as any; //TODO make better
          const tokens = dataAny.login as TokensGQL;
          console.log(tokens);
          this.setAccessToken(tokens.accessToken);
          this.setRefreshToken(tokens.refreshToken);
        },
        (error) => {
          alert(error);
        }
      );
  }
}
