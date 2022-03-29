import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService {
  constructor() {
    console.log('ResponsesService constructor');
  }

  getResponsesIds(): string[] {
    // query GQL server for the commander's responses
    // return the number of responses
    return ['issueId_1', 'issueId_2', 'issueId_3'];
  }

  getIssueData(issueId: string) {
    //given an issue id, return the issue data
    return `${issueId} issue data`;
  }

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
