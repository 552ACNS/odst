import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  CurrentUserQueryVariables,
} from './header.generated';
import {
  FindManyAccountRequestsDocument,
  FindManyAccountRequestsQuery,
  FindManyAccountRequestsQueryVariables,
} from '../requested-accounts/requested-accounts.generated';
import { map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private apollo: Apollo) {}
  querySubscription: Subscription;

  async getCurrentUser(): Promise<Observable<CurrentUserQuery>> {
    return this.apollo
      .watchQuery<CurrentUserQuery, CurrentUserQueryVariables>({
        query: CurrentUserDocument,
      })
      .valueChanges.pipe(map(({ data }) => data));
  }

  getRequestedAccounts() {
    return this.apollo.watchQuery<
      FindManyAccountRequestsQuery,
      FindManyAccountRequestsQueryVariables
    >({
      query: FindManyAccountRequestsDocument,
    }).valueChanges;
  }
}
