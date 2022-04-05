import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {
  FindManySurveyResponsesDocument,
  FindManySurveyResponsesQuery,
  FindManySurveyResponsesQueryVariables, SurveyResponseGql
} from "../../graphql-generated";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apollo: Apollo) {

  }

  responses: SurveyResponseGql[];
  querySubscription: Subscription;


  GetResponseCount() {
    return this.apollo
      .watchQuery<FindManySurveyResponsesQuery, FindManySurveyResponsesQueryVariables>({
        query: FindManySurveyResponsesDocument
      }).valueChanges;
  }
  dateIsMoreThan30DaysAgo(responseDate : Date) {
    const _difference = new Date().getTime() - responseDate.getTime();
    const _30DaysInMilliseconds = 2592000000;
    return _30DaysInMilliseconds < _difference;
  }
}
