import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import {
  CreateSurveyWithQuestions_FormDocument,
  CreateSurveyWithQuestions_FormMutation,
  CreateSurveyWithQuestions_FormMutationVariables,
  FindManyOrgs_FormDocument,
  FindManyOrgs_FormQuery,
  FindManyOrgs_FormQueryVariables,
  CreateSurveyResponse_FormMutation,
  CreateSurveyResponse_FormMutationVariables,
  CreateSurveyResponse_FormDocument,
  FindQuestionsBySurvey_FormQuery,
  FindQuestionsBySurvey_FormQueryVariables,
  FindQuestionsBySurvey_FormDocument,
  FindUsersWithRole_FormQuery,
  FindUsersWithRole_FormQueryVariables,
  FindUsersWithRole_FormDocument,
  Role,
} from '../../graphql-generated';
import { jsonTypeConverter } from '@odst/helpers';

@Injectable({
  providedIn: 'root',
})
export class SurveyQuestionsService {
  constructor(private apollo: Apollo) {}

  //a query to find all of the orgs available for the selector
  async getManyOrgs() {
    return this.apollo
      .watchQuery<FindManyOrgs_FormQuery, FindManyOrgs_FormQueryVariables>({
        query: FindManyOrgs_FormDocument,
      })
      .valueChanges.pipe(
        map((result) => result.data.findManyOrgs.map((x) => x.name))
      );
  }

  async findUsersWithRole(role: Role) {
    return this.apollo
      .watchQuery<
        FindUsersWithRole_FormQuery,
        FindUsersWithRole_FormQueryVariables
      >({
        query: FindUsersWithRole_FormDocument,
        variables: {
          role: role,
        },
      })
      .valueChanges.pipe(
        //TODO: fix this later when adding rank to user.
        map((result) =>
          result.data.findUsersWithRole
            .map((x) => `${x.rank} ${x.lastName}, ${x.firstName}`)
            .sort()
        )
      );
  }
  //Takes questions that are in an array and connectsOrCreates to a survey ID based on question set and returns the survey ID
  //that was found or created
  submitWithQuestions(questions: string[]) {
    return this.apollo.mutate<
      CreateSurveyWithQuestions_FormMutation,
      CreateSurveyWithQuestions_FormMutationVariables
    >({
      mutation: CreateSurveyWithQuestions_FormDocument,
      variables: {
        questionPrompts: questions,
      },
    });
  }
  //Using the survey ID created or connected to, we find the question ID's that are associated with that survey ID.
  //It then allows us to populate an array with the question ID's
  getQuestionsFromSurvey(surveyID: string) {
    return this.apollo
      .watchQuery<
        FindQuestionsBySurvey_FormQuery,
        FindQuestionsBySurvey_FormQueryVariables
      >({
        query: FindQuestionsBySurvey_FormDocument,
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
    console.log(valueArray);
    console.log(questionIDArray);
    return this.apollo.mutate<
      CreateSurveyResponse_FormMutation,
      CreateSurveyResponse_FormMutationVariables
    >({
      mutation: CreateSurveyResponse_FormDocument,
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
