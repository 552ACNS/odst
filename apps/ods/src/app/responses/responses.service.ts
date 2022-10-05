import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
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
  GetAllTagsQueryVariables,
  GetAllTagsQuery,
  GetAllTagsDocument,
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
    return this.apollo.watchQuery<GetAllTagsQuery, GetAllTagsQueryVariables>({
      query: GetAllTagsDocument,
    }).valueChanges;
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
      errorPolicy: 'all',
    });
  }
}
