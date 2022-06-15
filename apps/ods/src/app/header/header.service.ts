import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  AccountCountDocument,
  AccountCountQuery,
  AccountCountQueryVariables,
} from './header.generated';
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

  GetAccountCount() {
    return this.apollo.watchQuery<
      AccountCountQuery,
      AccountCountQueryVariables
    >({
      query: AccountCountDocument,
    }).valueChanges;
  }
}
