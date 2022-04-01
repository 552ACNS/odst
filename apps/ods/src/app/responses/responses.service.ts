import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { filter, map } from 'rxjs';
import {
  GetIssuesByStatusDocument,
  GetIssuesByStatusQuery,
  GetIssuesByStatusQueryVariables,
  GetSurveyResponseDataDocument,
  GetSurveyResponseDataQuery,
  GetSurveyResponseDataQueryVariables,
} from '../../graphql-generated';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService {
  constructor(private apollo: Apollo) {}
  async getResponseIDsByStatus(resolved: boolean) {
    return this.apollo
      .watchQuery<GetIssuesByStatusQuery, GetIssuesByStatusQueryVariables>({
        query: GetIssuesByStatusDocument,
        variables: {
          resolved: resolved,
        },
      })
      .valueChanges.pipe(map((result) => result.data.getIssuesByStatus));
  }

  // async getResponseData(issueId: string) {
  //   return this.apollo
  //     .watchQuery<
  //       GetSurveyResponseDataQuery,
  //       GetSurveyResponseDataQueryVariables
  //     >({
  //       query: GetSurveyResponseDataDocument,
  //       variables: {
  //         surveyResponseWhereUniqueInput: {
  //           id: issueId,
  //         },
  //       },
  //     })
  //     .valueChanges.pipe(map((result) => result.data.getSurveyResponseData));
  // }
}
