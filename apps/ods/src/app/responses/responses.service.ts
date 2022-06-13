import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs';

import {
  FindUniqueFeedbackResponseDocument,
  FindUniqueFeedbackResponseQuery,
  FindUniqueFeedbackResponseQueryVariables,
  AddCommentMutationVariables,
  AddCommentMutation,
  AddCommentDocument,
  UpdateResolvedMutation,
  UpdateResolvedMutationVariables,
  UpdateResolvedDocument,
  ModifyTagMutationVariables,
  ModifyTagMutation,
  ModifyTagDocument,
  GetReportByStatusQuery,
  GetReportByStatusDocument,
  GetReportByStatusQueryVariables,
} from './responses.generated';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService {
  constructor(private apollo: Apollo) {}
  async getReportByStatus(resolved: string, skip: number) {
    return this.apollo
      .watchQuery<GetReportByStatusQuery, GetReportByStatusQueryVariables>({
        query: GetReportByStatusDocument,
        variables: {
          resolved,
          skip,
        },
      })
      .valueChanges.pipe(map((result) => result.data.getIssuesByStatus));
    // pluck lets me retrieve nested data.
  }

  getTags() {
    return [
      'Gender',
      'Sexism',
      'Race',
      'Racism',
      'Sexuality',
      'Gender Identity',
      'Religion',
      'Mental Health',
      'Minority',
      'Marginalized',
      'Mental Illness',
      'Rank',
      'Observed',
      'Experienced',
      'Other',
      'Harassment',
      'Assault',
      'Discrimination',
    ];
  }

  addComment(addCommentMutationVariables: AddCommentMutationVariables) {
    return this.apollo.mutate<AddCommentMutation, AddCommentMutationVariables>({
      mutation: AddCommentDocument,
      variables: addCommentMutationVariables,
    });
  }

  updateResolved(
    updateResolvedMutationVariables: UpdateResolvedMutationVariables
  ) {
    return this.apollo.mutate<
      UpdateResolvedMutation,
      UpdateResolvedMutationVariables
    >({
      mutation: UpdateResolvedDocument,
      variables: updateResolvedMutationVariables,
    });
  }

  // async getResponseData(responseID: string) {
  //   return this.apollo.watchQuery<
  //     FindUniqueFeedbackResponseQuery,
  //     FindUniqueFeedbackResponseQueryVariables
  //   >({
  //     query: FindUniqueFeedbackResponseDocument,
  //     variables: {
  //       feedbackResponseWhereUniqueInput: {
  //         id: responseID,
  //       },
  //     },
  //   }).valueChanges;
  // }

  modifyTag(modifyTagMutationVariables: ModifyTagMutationVariables) {
    return this.apollo.mutate<ModifyTagMutation, ModifyTagMutationVariables>({
      mutation: ModifyTagDocument,
      variables: modifyTagMutationVariables,
    });
  }
}
