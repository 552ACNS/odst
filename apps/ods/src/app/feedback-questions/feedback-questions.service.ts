import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import {
  CreateFeedbackWithQuestionsDocument,
  CreateFeedbackWithQuestionsMutation,
  CreateFeedbackWithQuestionsMutationVariables,
  CreateFeedbackResponseMutation,
  CreateFeedbackResponseMutationVariables,
  CreateFeedbackResponseDocument,
  FindQuestionsByFeedbackQuery,
  FindQuestionsByFeedbackQueryVariables,
  FindQuestionsByFeedbackDocument,
  GetCommandersQuery,
  GetCommandersQueryVariables,
  GetCommandersDocument,
  GetOrgLineageQueryVariables,
  GetOrgLineageQuery,
  GetOrgLineageDocument,
} from './feedback-questions.generated';
import { jsonTypeConverter } from '@odst/helpers';
import { OrgWhereUniqueInput } from '../../types.graphql';

@Injectable({
  providedIn: 'root',
})
export class FeedbackQuestionsService {
  constructor(private apollo: Apollo) {}

  //a query to find all of the orgs available for the selector
  async getOrgLineage() {
    return this.apollo
      .watchQuery<GetOrgLineageQuery, GetOrgLineageQueryVariables>({
        query: GetOrgLineageDocument,
      })
      .valueChanges.pipe(map((result) => result.data.getOrgLineage));
  }

  async getCommanders() {
    return this.apollo
      .watchQuery<GetCommandersQuery, GetCommandersQueryVariables>({
        query: GetCommandersDocument,
      })
      .valueChanges.pipe(
        map((result) =>
          result.data.getCommanders
            .map((x) => `${x.grade} ${x.lastName}, ${x.firstName}`)
            .sort()
        )
      );
  }
  //Takes questions that are in an array and connectsOrCreates to a feedback ID based on question set and returns the feedback ID
  //that was found or created
  submitWithQuestions(
    questions: string[],
    orgWhereUniqueInput: OrgWhereUniqueInput
  ) {
    return this.apollo.mutate<
      CreateFeedbackWithQuestionsMutation,
      CreateFeedbackWithQuestionsMutationVariables
    >({
      mutation: CreateFeedbackWithQuestionsDocument,
      variables: {
        questionValues: questions,
        //TODO don't hardcode org
        orgWhereUniqueInput,
      },
    });
  }
  //Using the feedback ID created or connected to, we find the question ID's that are associated with that feedback ID.
  //It then allows us to populate an array with the question ID's
  getQuestionsFromFeedback(feedbackID: string) {
    return this.apollo
      .watchQuery<
        FindQuestionsByFeedbackQuery,
        FindQuestionsByFeedbackQueryVariables
      >({
        query: FindQuestionsByFeedbackDocument,
        variables: {
          feedbackWhereUniqueInput: {
            id: feedbackID,
          },
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.getSubQuestions.map((x) => x.id))
      );
  }
  //Connects to a feedback ID and submits answer values and connects those values to question ID's that are connected to the
  //feedback ID. It also determines if the feedback is to be routed outside the squadron.
  submitFeedbackReponse(
    outsideRouting: boolean,
    valueArray: string[],
    questionIDArray: string[],
    feedbackID: string | undefined
  ) {
    return this.apollo.mutate<
      CreateFeedbackResponseMutation,
      CreateFeedbackResponseMutationVariables
    >({
      mutation: CreateFeedbackResponseDocument,
      variables: {
        feedbackResponseCreateInput: {
          routeOutside: outsideRouting,
          answers: {
            createMany: {
              data: jsonTypeConverter(valueArray, questionIDArray),
            },
          },
          feedback: {
            connect: {
              id: feedbackID,
            },
          },
        },
      },
    });
  }
  // TODO: Do testing on this function
}
