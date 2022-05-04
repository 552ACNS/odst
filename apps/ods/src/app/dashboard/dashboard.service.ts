import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  ResponseCountDocument,
  ResponseCountQuery,
  ResponseCountQueryVariables,
} from './dashboard.generated';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apollo: Apollo) {}
  querySubscription: Subscription;

  GetResponseCount() {
    return this.apollo.watchQuery<
      ResponseCountQuery,
      ResponseCountQueryVariables
    >({
      query: ResponseCountDocument,
    }).valueChanges;
  }

  getCurrentUser() {
    return this.apollo.watchQuery<CurrentUserQuery, CurrentUserQueryVariables>({
      query: CurrentUserDocument,
    }).valueChanges;
  }
}
