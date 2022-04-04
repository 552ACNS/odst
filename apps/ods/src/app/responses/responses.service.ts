import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import {
  GetIssuesByStatusDocument,
  GetIssuesByStatusQuery,
  GetIssuesByStatusQueryVariables,
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
            // We can opt to not send date now and instead just do it in the
            // back end, but that would mean having to make another
            // UpdateSurveyResponse method
            closedDate: Date.now(),
            resolution: resolution,
          },
        },
      })
      .subscribe();
  }
}
