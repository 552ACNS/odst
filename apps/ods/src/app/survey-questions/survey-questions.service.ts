import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs';
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
  OrgGql,
  QuestionGql,
  FindQuestionsBySurvey_FormQuery,
  FindQuestionsBySurvey_FormQueryVariables,
  FindQuestionsBySurvey_FormDocument,
} from '../../graphql-generated';

@Injectable({
  providedIn: 'root',
})
export class SurveyQuestionsService {
  constructor(private apollo: Apollo) {}

  async getManyOrgs() {
    return this.apollo
      .watchQuery<FindManyOrgs_FormQuery, FindManyOrgs_FormQueryVariables>({
        query: FindManyOrgs_FormDocument,
      })
      .valueChanges.pipe(
        map((result) => result.data.findManyOrgs.map((x) => x.name))
      );
  }
}
