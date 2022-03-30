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

  unresolvedReports = 21;
  overdueReports = 5;
  resolvedReports = 9;

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery<FindManySurveyResponsesQuery, FindManySurveyResponsesQueryVariables>({
        query: FindManySurveyResponsesDocument
      })
      .valueChanges.subscribe(({data}) => {
        this.responses = data.findManySurveyResponses;
      });
  }

}
