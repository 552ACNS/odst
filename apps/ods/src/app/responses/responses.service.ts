import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GetIssuesByStatusDocument,
  GetIssuesByStatusQuery,
  GetIssuesByStatusQueryVariables,
  GetSurveyResponseDataDocument,
  GetSurveyResponseDataQuery,
  GetSurveyResponseDataQueryVariables,
} from '../../graphql-generated';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService {
  constructor(private apollo: Apollo) {}

  // async getResponseIDsByStatus(resolved: boolean): Promise<string[]> {
  //   let responseIds: string[] = [];

  //   this.apollo
  //     .query<GetIssuesByStatusQuery, GetIssuesByStatusQueryVariables>({
  //       query: GetIssuesByStatusDocument,
  //       variables: {
  //         resolved: resolved,
  //       },
  //     })
  //     .subscribe(({ data }) => {
  //       responseIds = data.getIssuesByStatus;
  //     });

  //   return responseIds;
  // }


  getPrompts(surveyId: string): string[] {
    console.log(surveyId);
    // query GQL server for the commander's prompts
    return ['prompt_1', 'prompt_2', 'prompt_3'];
  }
  getAnswers(surveyResponseId: string): string[] {
    console.log(surveyResponseId);
    // query GQL server for the commander's answers
    return ['answer_1', 'answer_2', 'answer_3'];
  }
}
