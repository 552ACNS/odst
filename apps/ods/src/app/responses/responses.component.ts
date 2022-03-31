import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable, Subscription } from 'rxjs';
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
  responseID$: Observable<string[]>;

  qas: [string, string][] = [];

  dateOfIssue = formatDate(Date.now(), 'MMMM d, yyyy', 'en-US');
  numberOfResponses: number;
  responsesPerPage = 1;
  displayedIssue = 0;

  issueData;
  // MatPaginator Output
  pageEvent: PageEvent;

  private querySubscription: Subscription;

  async ngOnInit() {
    // Fetch the issue ids to be displayed...
    await this.getResponseIDsByStatus(false);
  }

  async getResponseIDsByStatus(resolved: boolean) {
    this.responseID$ = this.apollo
      .watchQuery<GetIssuesByStatusQuery, GetIssuesByStatusQueryVariables>({
        query: GetIssuesByStatusDocument,
        variables: {
          resolved: resolved,
        },
      })
      .valueChanges.pipe(map((result) => result.data.getIssuesByStatus));

    // get the number of issues from the number of responseID$
    this.responseID$.subscribe((ids) => {
      this.numberOfResponses = ids.length;
    });
  }

  async getResponseData(issueId: string) {
    this.issueData = this.apollo
      .watchQuery<
        GetSurveyResponseDataQuery,
        GetSurveyResponseDataQueryVariables
      >({
        query: GetIssuesByStatusDocument,
        variables: {
          surveyResponseWhereUniqueInput: {
            id: issueId,
          },
        },
      })
      .valueChanges.pipe(map((result) => result.data.getSurveyResponseData));

    console.log(this.issueData);
  }

  // display the issue data for the selected issue from the paginator
  displayIssue(pageEvent: PageEvent) {
    if (pageEvent) {
      this.getResponseData(this.responseID$[pageEvent.pageIndex]);
      this.displayedIssue = pageEvent.pageIndex;
      //this.prompts = this.responsesService.getPrompts("surveyId");
    }
    return pageEvent;
  }

  // TODO IMPORTANT: set to first page on load

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
  }
}

// Suppose our profile query took an avatar size
