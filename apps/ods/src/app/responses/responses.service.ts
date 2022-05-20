import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { first, map, take } from 'rxjs';
import {
  CommentCreateWithoutSurveyResponseInput,
  SurveyResponseUpdateInput,
} from '../../types.graphql';
import {
  GetIssuesByStatusDocument,
  GetIssuesByStatusQuery,
  GetIssuesByStatusQueryVariables,
  FindUniqueSurveyResponseDocument,
  FindUniqueSurveyResponseQuery,
  FindUniqueSurveyResponseQueryVariables,
  UpdateSurveyResponseDocument,
  UpdateSurveyResponseMutation,
  UpdateSurveyResponseMutationVariables,
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

  async updateSurveyResponseComments(
    updateSurveyResponseMutationVariables: UpdateSurveyResponseMutationVariables
  ) {
    console.log('test');

    return this.apollo
      .mutate<
        UpdateSurveyResponseMutation,
        UpdateSurveyResponseMutationVariables
      >({
        mutation: UpdateSurveyResponseDocument,
        variables: updateSurveyResponseMutationVariables,
      })
      .subscribe();
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
