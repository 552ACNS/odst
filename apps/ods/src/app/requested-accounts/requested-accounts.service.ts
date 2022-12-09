import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ApproveAccountRequestDocument,
  ApproveAccountRequestMutation,
  ApproveAccountRequestMutationVariables,
  FindManyAccountRequestsDocument,
  FindManyAccountRequestsQuery,
  FindManyAccountRequestsQueryVariables,
  FindUniqueAccountRequestQuery,
  FindUniqueAccountRequestQueryVariables,
  FindUniqueAccountRequestDocument,
  UpdateAccountRequestMutationVariables,
  UpdateAccountRequestMutation,
  UpdateAccountRequestDocument,
} from './requested-accounts.generated';

@Injectable({
  providedIn: 'root',
})
export class RequestedAccountsService {
  constructor(private apollo: Apollo) {}
  getRequestedAccounts() {
    return this.apollo.watchQuery<
      FindManyAccountRequestsQuery,
      FindManyAccountRequestsQueryVariables
    >({
      query: FindManyAccountRequestsDocument,
    }).valueChanges;
  }

  acceptAccountRequest(id: string) {
    return this.apollo.mutate<
      ApproveAccountRequestMutation,
      ApproveAccountRequestMutationVariables
    >({
      mutation: ApproveAccountRequestDocument,
      variables: {
        userWhereUniqueInput: {
          id: id,
        },
      },
    });
  }

  findUniqueAccountRequest(id: string) {
    return this.apollo.query<
      FindUniqueAccountRequestQuery,
      FindUniqueAccountRequestQueryVariables
    >({
      query: FindUniqueAccountRequestDocument,
      variables: {
        accountRequestWhereUniqueInput: {
          userId: id,
        },
      },
    });
  }

  updateAccountRequest(
    updateAccountRequestMutationVariables: UpdateAccountRequestMutationVariables
  ) {
    return this.apollo.mutate<
      UpdateAccountRequestMutation,
      UpdateAccountRequestMutationVariables
    >({
      mutation: UpdateAccountRequestDocument,
      variables: updateAccountRequestMutationVariables,
    });
  }
}
