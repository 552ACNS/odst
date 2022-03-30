import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ResponsesService } from './responses.service';
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

@Component({
  selector: 'odst-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit, OnDestroy {
  constructor(
    private apollo: Apollo,
    private responsesService: ResponsesService
  ) {}

  prompts: string[];
  responseIDs: string[];

  qas: [string, string][] = [];

  dateOfIssue = formatDate(Date.now(), 'MMMM d, yyyy', 'en-US');
  numberOfResponses = 5;
  responsesPerPage = 1;
  displayedIssue = 0;

  issueData;
  issueIds: string[];
  // MatPaginator Output
  pageEvent: PageEvent;

  private querySubscription: Subscription;

  async ngOnInit() {
    // Fetch the issue ids to be displayed...
    await this.getResponseIDsByStatus(false)
      .then(async () => {
        // update the number of responses to be displayed
        if (this.responseIDs !== undefined) {
          this.numberOfResponses = this.responseIDs.length;

          console.log(this.numberOfResponses);

          await this.getResponseData(this.issueIds[0]).then(
            () => {
              console.log(this.issueData);
            }
          );

          this.displayedIssue = 0;
        }
      })

    // this.prompts = this.responsesService.getPrompts('surveyId');
    // this.responsesID = this.responsesService.getAnswers('surveyResponseId');

    // // combine the prompts and responses into a QA array
    // for (let i = 0; i < this.prompts.length; i++) {
    //   this.qas.push([this.prompts[i], this.responsesID[i]]);
    // }
  }

  async getResponseIDsByStatus(resolved: boolean) {
    this.querySubscription = this.apollo
      .query<GetIssuesByStatusQuery, GetIssuesByStatusQueryVariables>({
        query: GetIssuesByStatusDocument,
        variables: {
          resolved: resolved,
        },
      })
      .subscribe(({ data }) => {
        this.responseIDs = data.getIssuesByStatus;
      });
  }

  async getResponseData(issueId: string) {
    this.querySubscription = this.apollo
      .query<GetSurveyResponseDataQuery, GetSurveyResponseDataQueryVariables>({
        query: GetSurveyResponseDataDocument,
        variables: {
          surveyResponseWhereUniqueInput: {
            id: issueId,
          },
        },
      })
      .subscribe(({ data }) => {
        this.issueData = data.getSurveyResponseData;
      });
  }

  // display the issue data for the selected issue from the paginator
  displayIssue(pageEvent: PageEvent) {
    if (pageEvent) {
      this.issueData = this.getResponseData(
        this.issueIds[pageEvent.pageIndex]
      );
      this.displayedIssue = pageEvent.pageIndex;
      //this.prompts = this.responsesService.getPrompts("surveyId");
    }
    return pageEvent;
  }

  // TODO IMPORTANT: set to first page on load

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}

// Suppose our profile query took an avatar size
