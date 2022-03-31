import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {
  SurveyResponseGql,
  FindManySurveyResponsesQuery,
  FindManySurveyResponsesQueryVariables,
  FindManySurveyResponsesDocument
} from '../../graphql-generated';
import {Subscription} from "rxjs";


@Component({
  selector: 'odst-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  responses: SurveyResponseGql[];
  querySubscription: Subscription;

  constructor(private apollo: Apollo) {

  }

  unresolvedReports: number;
  overdueReports: number;
  resolvedReports: number;

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<FindManySurveyResponsesQuery, FindManySurveyResponsesQueryVariables>({
        query: FindManySurveyResponsesDocument
      })
      .valueChanges.subscribe(({data}) => {
        this.responses = data.findManySurveyResponses;
        this.unresolvedReports = this.responses.filter(issue => issue.resolution == null).length;
        this.resolvedReports = this.responses.filter(issue => issue.resolution != null).length;
        this.overdueReports = this.responses.filter(issue => dateIsMoreThan30DaysAgo(new Date(issue.openedDate))).length;
      });

    function dateIsMoreThan30DaysAgo(responseDate : Date) {
      const _difference = new Date().getTime() - responseDate.getTime();
      const _30DaysInMilliseconds = 2592000000;
      return _30DaysInMilliseconds < _difference;
    }
  }
}
