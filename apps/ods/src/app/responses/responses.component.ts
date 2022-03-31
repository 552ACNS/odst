import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable, Subscription } from 'rxjs';
import { ResponsesService } from './responses.service';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  GetIssuesByStatusDocument,
  GetIssuesByStatusQuery,
  GetIssuesByStatusQueryVariables,
  GetSurveyResponseDataDocument,
  GetSurveyResponseDataQuery,
  GetSurveyResponseDataQueryVariables,
} from '../../graphql-generated';
import { SurveyResponseGQL } from '@odst/types/ods';
import { ApolloQueryResult } from '@apollo/client/core';

@Component({
  selector: 'odst-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit, OnDestroy {
  constructor(
    private apollo: Apollo,
  ) {}

  // Prompts are the 
  prompts: string[];
  responseID$: Observable<string[]>;

  qas: [string, string][] = [];

  dateOfIssue = formatDate(Date.now(), 'MMMM d, yyyy', 'en-US');
  numberOfResponses: number;
  displayedIssueIndex: number;

  issueData$: Observable<ApolloQueryResult<GetSurveyResponseDataQuery>>;

  // MatPaginator Output
  pageEvent: PageEvent;

  private querySubscription: Subscription;

  async ngOnInit() {
    // Fetch the issue ids to be displayed...
    await this.getResponseIDsByStatus(false);
    this.pageEvent = { pageIndex: 0, pageSize: 1, length: 1 };
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
      console.log(ids);
    });
  }

  async getResponseData(issueId: string) {
    this.issueData$ = this.apollo
      .watchQuery<GetSurveyResponseDataQuery, GetSurveyResponseDataQueryVariables>({
        query: GetSurveyResponseDataDocument,
        variables: {
          surveyResponseWhereUniqueInput: {
            id: issueId,
          },
        },
      })
      .valueChanges.pipe(map((result) => result));

    this.issueData$.subscribe((data) => {
      console.log(data.data.getSurveyResponseData);
    });
  }

  // display the issue data for the selected issue from the paginator
  displayIssue(pageEvent: PageEvent): PageEvent {
    if (pageEvent) {
      this.responseID$.subscribe((ids) => {
        this.displayedIssueIndex = pageEvent.pageIndex;
        console.log(pageEvent.pageIndex);
        console.log(this.displayedIssueIndex);
        this.getResponseData(ids[this.displayedIssueIndex]);
      });

      // this.getResponseData("e66c6fb1-cc11-4e11-9cd8-d127e43443911");
      // this.getResponseData(this.responseID$[pageEvent.pageIndex]);

      // console.log(this.displayedIssue)
      // this.displayedIssue = pageEvent.pageIndex;
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
