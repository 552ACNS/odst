import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,
  FindManyOrgsDocument,
  FindManyOrgsQuery,
  FindManyOrgsQueryVariables,
  UsernameOrEmailExistsDocument,
  UsernameOrEmailExistsQuery,
  UsernameOrEmailExistsQueryVariables,
} from './request-account.generated';

@Injectable({
  providedIn: 'root',
})
export class RequestAccountService {
  constructor(private apollo: Apollo) {}

  //a query to find all of the orgs available for the selector
  async getManyOrgs(): Promise<Observable<string[]>> {
    return this.apollo
      .watchQuery<FindManyOrgsQuery, FindManyOrgsQueryVariables>({
        query: FindManyOrgsDocument,
      })
      .valueChanges.pipe(
        map((result) => result.data.findManyOrgs.map((x) => x.name))
      );
  }

  async emailExists(email: string): Promise<Observable<boolean>> {
    return this.apollo
      .watchQuery<
        UsernameOrEmailExistsQuery,
        UsernameOrEmailExistsQueryVariables
      >({
        query: UsernameOrEmailExistsDocument,
        variables: {
          usernameOrEmail: email,
        },
      })
      .valueChanges.pipe(map((result) => result.data.usernameOrEmailExists));
  }

  submitAccountCreationRequest(
    createUserMutationVariables: CreateUserMutationVariables['userCreateInput']
  ) {
    return this.apollo.mutate<CreateUserMutation, CreateUserMutationVariables>({
      mutation: CreateUserDocument,
      variables: {
        userCreateInput: createUserMutationVariables,
      },
    });
  }
}
