import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { filter, map } from 'rxjs';
import {
  GetIssuesByStatusDocument,
  GetIssuesByStatusQuery,
  GetIssuesByStatusQueryVariables,
  GetSurveyResponseDataDocument,
  GetSurveyResponseDataQuery,
  GetSurveyResponseDataQueryVariables,
  UpdateSurveyResponse_ResolutionDocument,
  UpdateSurveyResponse_ResolutionMutation,
  UpdateSurveyResponse_ResolutionMutationVariables,
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

  async updateResolution(id: string, resolution: string) {
    this.apollo
      .mutate<
        UpdateSurveyResponse_ResolutionMutation,
        UpdateSurveyResponse_ResolutionMutationVariables
      >({
        mutation: UpdateSurveyResponse_ResolutionDocument,
        variables: {
          surveyResponseWhereUniqueInput: {
            id: id,
          },
          surveyResponseUpdateInput: {
            closedDate: Date.now(),
            resolution: resolution,
          },
        },
      })
      .subscribe();
  }
}
