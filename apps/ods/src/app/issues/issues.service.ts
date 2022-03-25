import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor() { 
    console.log('IssuesService constructor');
  }

  getIssuesIds(): string[] {
    // query GQL server for the commander's issues
    // return the number of issues
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
