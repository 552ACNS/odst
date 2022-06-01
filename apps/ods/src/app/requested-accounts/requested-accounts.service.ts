import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ApproveAccountRequestDocument,
  ApproveAccountRequestMutation,
  ApproveAccountRequestMutationVariables,
  FindManyAccountRequestsDocument,
  FindManyAccountRequestsQuery,
  FindManyAccountRequestsQueryVariables,
  DeclineAccountRequestDocument,
  DeclineAccountRequestMutation,
  DeclineAccountRequestMutationVariables,
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
        accountRequestWhereUniqueInput: {
          id: id,
        },
      },
    });
  }

  denyAccountRequest(id: string) {
    return this.apollo.mutate<
      DeclineAccountRequestMutation,
      DeclineAccountRequestMutationVariables
    >({
      mutation: DeclineAccountRequestDocument,
      variables: {
        accountRequestWhereUniqueInput: {
          id: id,
        },
      },
    });
  }
}
