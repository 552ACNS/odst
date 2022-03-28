import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResponsesService } from './responses.service';

@Component({
  selector: 'odst-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit {
  constructor(private responsesService: ResponsesService) {}

  prompts: string[];
  responses: string[];

  qas: [string, string][] = [];

  dateOfIssue = formatDate(Date.now(), 'MMMM d, yyyy', 'en-US');
  numberOfResponses = 3;
  responsesPerPage = 1;
  displayedIssue = 0;

  issueData = '';
  issueIds: string[];
  // MatPaginator Output
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.issueIds = this.responsesService.getResponsesIds();
    this.numberOfResponses = this.issueIds.length;
    this.prompts = this.responsesService.getPrompts('surveyId');
    this.responses = this.responsesService.getAnswers('surveyResponseId');

    // combine the prompts and responses into a QA array
    for (let i = 0; i < this.prompts.length; i++) {
      this.qas.push([this.prompts[i], this.responses[i]]);
    }
  }

  // display the issue data for the selected issue from the paginator
  displayIssue(pageEvent: PageEvent) {
    if (pageEvent) {
      this.issueData = this.responsesService.getIssueData(
        this.issueIds[pageEvent.pageIndex]
      );
      this.displayedIssue = pageEvent.pageIndex;
      //this.prompts = this.responsesService.getPrompts("surveyId");
    }
    return pageEvent;
  }

  // TODO IMPORTANT: set to first page on load
}
