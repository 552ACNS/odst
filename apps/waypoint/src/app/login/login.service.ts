import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { TokensGQL } from '@odst/types';
import { getRefreshToken, setRefreshToken, getAccessToken, setAccessToken } from '@odst/helpers';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo) {}

  // TODO consider switching to sessionStorage
  // "What will happen if I'm logged in on multiple tabs?"; won't be authenticated in new tabs
  // https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

  // If SRR is implemented, will need to figure out how SSR plays into all of this

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
          data = data.login
          if (data) {
            console.log(data);
            const dataAny = data as any; //TODO make better
          const loginResponse = dataAny.login as LoginResponse;
          this.setJwtToken(loginResponse.token)
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
          }
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
        }
      }
    `;
    this.apollo
      .mutate<TokensGQL>({
        mutation: REFRESH,
        context: {
          headers: {
            Authorization: `Bearer ${getRefreshToken()}`,
          },
        },
      })
      .subscribe(
        ({ data }) => {
          if (data) {
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
          }
        },
        (error) => {
          alert(error);
        }
      );
  }
}
