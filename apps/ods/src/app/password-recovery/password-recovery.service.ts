import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import {
  ResetEmailDocument,
  ResetEmailMutation,
  ResetEmailMutationVariables,
} from './password-recovery.generated';

@Injectable({
  providedIn: 'root',
})
export class PasswordRecoveryService {
  constructor(private apollo: Apollo) {}

  passwordRecovery(email: string) {
    return of({
      email: 'HickeyPl3ase@a.com',
    });
  }

  async resetEmail(email: string) {
    return this.apollo.mutate<ResetEmailMutation, ResetEmailMutationVariables>({
      mutation: ResetEmailDocument,
      variables: {
        userEmail: email,
      },
      errorPolicy: 'all',
    });
  }
}
