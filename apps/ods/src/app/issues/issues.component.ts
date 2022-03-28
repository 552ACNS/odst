import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IssuesService } from './issues.service';

@Component({
  selector: 'odst-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  constructor(private issuesService: IssuesService) {}

  prompts: string[];
  responses: string[];

  qas: [string, string][] = [];

  dateOfIssue = formatDate(Date.now(), 'MMMM d, yyyy', 'en-US');
  numberOfIssues = 3;
  issuesPerPage = 1;
  displayedIssue = 0;

  issueData = '';
  issueIds: string[];
  // MatPaginator Output
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.issueIds = this.issuesService.getIssuesIds();
    this.numberOfIssues = this.issueIds.length;
    this.prompts = this.issuesService.getPrompts('surveyId');
    this.responses = this.issuesService.getAnswers('surveyResponseId');

    // combine the prompts and responses into a QA array
    for (let i = 0; i < this.prompts.length; i++) {
      this.qas.push([this.prompts[i], this.responses[i]]);
    }
  }

  // display the issue data for the selected issue from the paginator
  displayIssue(pageEvent: PageEvent) {
    if (pageEvent) {
      this.issueData = this.issuesService.getIssueData(
        this.issueIds[pageEvent.pageIndex]
      );
      this.displayedIssue = pageEvent.pageIndex;
      //this.prompts = this.issuesService.getPrompts("surveyId");
    }
    return pageEvent;
  }

  // TODO IMPORTANT: set to first page on load
}
