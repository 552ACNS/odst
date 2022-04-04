import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GetSurveyDataDashboardDocument,
  GetSurveyDataDashboardQuery,
  GetSurveyDataDashboardQueryVariables,
} from '../../graphql-generated';
import { Subscription } from 'rxjs';

@Component({
  selector: 'odst-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  responses: GetSurveyDataDashboardQuery;
  querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  unresolvedReports: number;
  overdueReports: number;
  resolvedReports: number;

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<
        GetSurveyDataDashboardQuery,
        GetSurveyDataDashboardQueryVariables
      >({
        query: GetSurveyDataDashboardDocument,
      })
      .valueChanges.subscribe((result) => {
        //TODO move all of this functionality to the back end

        // TODO Filter by user once we enable users
        this.responses = result.data;

        this.unresolvedReports = this.responses.findManySurveyResponses.filter(
          (issue) => issue.resolution == null
        ).length;

        this.resolvedReports = this.responses.findManySurveyResponses.filter(
          (issue) => issue.resolution != null
        ).length;

        this.overdueReports = this.responses.findManySurveyResponses.filter(
          (issue) => dateIsMoreThan30DaysAgo(new Date(issue.openedDate))
        ).length;

      });

    function dateIsMoreThan30DaysAgo(responseDate: Date) {
      const _difference = new Date().getTime() - responseDate.getTime();
      const _30DaysInMilliseconds = 2592000000;
      return _30DaysInMilliseconds < _difference;
    }
  }
}
