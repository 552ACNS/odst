import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  DashboardIssueCountDocument,
  DashboardIssueCountQuery,
  DashboardIssueCountQueryVariables,
} from '../../graphql-generated';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apollo: Apollo) {}
  querySubscription: Subscription;

  GetResponseCount() {
    return this.apollo.watchQuery<
      DashboardIssueCountQuery,
      DashboardIssueCountQueryVariables
    >({
      query: DashboardIssueCountDocument,
    }).valueChanges;
  }
}
