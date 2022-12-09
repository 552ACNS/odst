import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  QueryQuery,
  QueryDocument,
  QueryQueryVariables,
} from './password-reset.generated';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  constructor(private apollo: Apollo) {}

  passwordReset(password: string) {
    return of({
      password: 'HickeyPl3ase',
    });
  }

  async checkToken(resetToken: string) {
    return this.apollo.watchQuery<QueryQuery, QueryQueryVariables>({
      query: QueryDocument,
      variables: {
        checkResetToken: resetToken,
      },
      errorPolicy: 'all',
    });
  }
}
