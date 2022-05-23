import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs';

import {
  GetIssuesByStatusDocument,
  GetIssuesByStatusQuery,
  GetIssuesByStatusQueryVariables,
  FindUniqueSurveyResponseDocument,
  FindUniqueSurveyResponseQuery,
  FindUniqueSurveyResponseQueryVariables,
  AddCommentMutationVariables,
  AddCommentMutation,
  AddCommentDocument,
} from './responses.generated';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService {
  constructor(private apollo: Apollo) {}
  async getResponseIDsByStatus(resolved: string) {
    return this.apollo
      .watchQuery<GetIssuesByStatusQuery, GetIssuesByStatusQueryVariables>({
        query: GetIssuesByStatusDocument,
        variables: {
          resolved: resolved,
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.getIssuesByStatus),
        take(1)
      );
    // pluck lets me retrieve nested data.
  }

  async addComment(addCommentMutationVariables: AddCommentMutationVariables) {
    return this.apollo
      .mutate<AddCommentMutation, AddCommentMutationVariables>({
        mutation: AddCommentDocument,
        variables: addCommentMutationVariables,
      })
      .pipe(map((result) => result?.data?.updateSurveyResponse));
  }

  async getResponseData(responseID: string) {
    return this.apollo.watchQuery<
      FindUniqueSurveyResponseQuery,
      FindUniqueSurveyResponseQueryVariables
    >({
      query: FindUniqueSurveyResponseDocument,
      variables: {
        surveyResponseWhereUniqueInput: {
          id: responseID,
        },
      },
    }).valueChanges;
  }
}
