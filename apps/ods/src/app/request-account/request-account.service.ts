import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import {
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,
  FindManyOrgsDocument,
  FindManyOrgsQuery,
  FindManyOrgsQueryVariables,
  FindUniqueUserDocument,
  FindUniqueUserQuery,
  FindUniqueUserQueryVariables,
} from './request-account.generated';

@Injectable({
  providedIn: 'root',
})
export class RequestAccountService {
  constructor(private apollo: Apollo) {}

  //a query to find all of the orgs available for the selector
  async getManyOrgs() {
    return this.apollo
      .watchQuery<FindManyOrgsQuery, FindManyOrgsQueryVariables>({
        query: FindManyOrgsDocument,
      })
      .valueChanges.pipe(
        map((result) => result.data.findManyOrgs.map((x) => x.name))
      );
  }

  async findUniqueUser(email: string) {
    return this.apollo
      .watchQuery<FindUniqueUserQuery, FindUniqueUserQueryVariables>({
        query: FindUniqueUserDocument,
        variables: {
          userWhereUniqueInput: {
            email: email,
          },
        },
      })
      .valueChanges.pipe(map((result) => result.data));
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
