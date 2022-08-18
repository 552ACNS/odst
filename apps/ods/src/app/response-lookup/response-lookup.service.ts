import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  FeedbackResponseByIdDocument,
  FeedbackResponseByIdQuery,
  FeedbackResponseByIdQueryVariables,
} from './response-lookup.generated';

@Injectable({
  providedIn: 'root',
})
export class ResponseLookupService {
  constructor(private apollo: Apollo) {}
  async getFeedbackReponseById(id: string) {
    return this.apollo.watchQuery<
      FeedbackResponseByIdQuery,
      FeedbackResponseByIdQueryVariables
    >({
      query: FeedbackResponseByIdDocument,
      variables: {
        feedbackResponseWhereUniqueInput: {
          id: id,
        },
      },
      errorPolicy: 'all',
    }).valueChanges;
  }
}
