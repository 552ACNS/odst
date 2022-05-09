import { Injectable } from '@angular/core';
import { CommentGQL } from '@odst/types/ods';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs';
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

  updateResolution(id: string, comments: CommentGQL[]) {
    return this.apollo
      .mutate<
        UpdateSurveyResponseMutation,
        UpdateSurveyResponseMutationVariables
      >({
        mutation: UpdateSurveyResponseDocument,
        variables: {
          surveyResponseWhereUniqueInput: {
            id: id,
          },
          surveyResponseUpdateInput: {
            // We can opt to not send date now and instead just do it in the
            // back end, but that would mean having to make another
            // UpdateSurveyResponse method
            closedDate: Date.now(),
            comments: comments,
          },
        },
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
