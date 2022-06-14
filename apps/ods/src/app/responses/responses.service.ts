import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs';

import {
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
  async getReportByStatus(status: string, skip: number, take: number) {
    return this.apollo.watchQuery<
      GetReportByStatusQuery,
      GetReportByStatusQueryVariables
    >({
      query: GetReportByStatusDocument,
      variables: {
        status,
        skip,
        take,
      },
    }).valueChanges;
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

  modifyTag(modifyTagMutationVariables: ModifyTagMutationVariables) {
    return this.apollo.mutate<ModifyTagMutation, ModifyTagMutationVariables>({
      mutation: ModifyTagDocument,
      variables: modifyTagMutationVariables,
    });
  }
}
