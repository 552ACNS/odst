import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import {
  CreateSurveyWithQuestionsDocument,
  CreateSurveyWithQuestionsMutation,
  CreateSurveyWithQuestionsMutationVariables,
  CreateSurveyResponseMutation,
  CreateSurveyResponseMutationVariables,
  CreateSurveyResponseDocument,
  FindQuestionsBySurveyQuery,
  FindQuestionsBySurveyQueryVariables,
  FindQuestionsBySurveyDocument,
  GetCommandersQuery,
  GetCommandersQueryVariables,
  GetCommandersDocument,
  GetOrgLineageQueryVariables,
  GetOrgLineageQuery,
  GetOrgLineageDocument,
} from './survey-questions.generated';
import { jsonTypeConverter } from '@odst/helpers';
import { OrgWhereUniqueInput } from '../../types.graphql';

@Injectable({
  providedIn: 'root',
})
export class SurveyQuestionsService {
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
  //Takes questions that are in an array and connectsOrCreates to a survey ID based on question set and returns the survey ID
  //that was found or created
  submitWithQuestions(
    questions: string[],
    orgWhereUniqueInput: OrgWhereUniqueInput
  ) {
    return this.apollo.mutate<
      CreateSurveyWithQuestionsMutation,
      CreateSurveyWithQuestionsMutationVariables
    >({
      mutation: CreateSurveyWithQuestionsDocument,
      variables: {
        questionPrompts: questions,
        //TODO don't hardcode org
        orgWhereUniqueInput,
      },
    });
  }
  //Using the survey ID created or connected to, we find the question ID's that are associated with that survey ID.
  //It then allows us to populate an array with the question ID's
  getQuestionsFromSurvey(surveyID: string) {
    return this.apollo
      .watchQuery<
        FindQuestionsBySurveyQuery,
        FindQuestionsBySurveyQueryVariables
      >({
        query: FindQuestionsBySurveyDocument,
        variables: {
          surveyWhereUniqueInput: {
            id: surveyID,
          },
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.getSubQuestions.map((x) => x.id))
      );
  }
  //Connects to a survey ID and submits answer values and connects those values to question ID's that are connected to the
  //survey ID. It also determines if the survey is to be routed outside the squadron.
  submitSurveyReponse(
    outsideRouting: boolean,
    valueArray: string[],
    questionIDArray: string[],
    surveyID: string | undefined
  ) {
    return this.apollo.mutate<
      CreateSurveyResponseMutation,
      CreateSurveyResponseMutationVariables
    >({
      mutation: CreateSurveyResponseDocument,
      variables: {
        surveyResponseCreateInput: {
          routeOutside: outsideRouting,
          answers: {
            createMany: {
              data: jsonTypeConverter(valueArray, questionIDArray),
            },
          },
          survey: {
            connect: {
              id: surveyID,
            },
          },
        },
      },
    });
  }
  // TODO: Do testing on this function
}
