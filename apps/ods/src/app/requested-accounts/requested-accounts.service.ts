import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  FindManyAccountRequestsDocument,
  FindManyAccountRequestsQuery,
  FindManyAccountRequestsQueryVariables,
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
}
