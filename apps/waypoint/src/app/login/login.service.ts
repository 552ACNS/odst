import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { TokensGQL } from '@odst/types';
import { setRefreshToken, setAccessToken } from '@odst/helpers';
import { LOGIN } from '../../graphql/mutations';

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
    this.apollo
      .mutate({
        mutation: LOGIN,
        variables: {
          username: username,
          password: password, //TODO hash password first, need to change backend too
        },
      })
      .subscribe(
        ({ data }) => {
          const tokens = (data as any)?.login as TokensGQL; //TODO make better
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
        },
        (error) => {
          alert(error);
        }
      );
  }
}
