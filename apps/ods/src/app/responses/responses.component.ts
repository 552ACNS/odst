import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable, Subscription } from 'rxjs';
import { ResponsesService } from './responses.service';
import { FormBuilder, Validators } from '@angular/forms';
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
import { subscribe } from 'graphql';

@Component({
  selector: 'odst-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})


export class ResponsesComponent implements OnInit {

  resolutionForm = this.fb.group({
    resolution: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private responsesService: ResponsesService
  ) {}

  // Prompts are the
  prompts: string[];

  qas: [string, string][] = [];

  openedDate: string;
  numberOfResponses: number;
  displayedIndex: number;

  responseID$: Observable<string[]>;

  // resolution = '';

  // MatPaginator Output
  pageEvent: PageEvent;

  async ngOnInit() {
    // get the response IDs by status then...
    await this.getResponseIDsByStatus(false).then(() => {
      // page event to display the first issue
      this.pageEvent = { pageIndex: 0, pageSize: 1, length: 1 };

      // navigate to that issue
      this.displayIssue(this.pageEvent);
    });
  }

  async getResponseIDsByStatus(resolved: boolean) {
    // get response IDs by status
    this.responseID$ = await this.responsesService.getResponseIDsByStatus(
      resolved
    );

    // set number of responses
    this.responseID$.subscribe((ids) => {
      this.numberOfResponses = ids.length;
    });
  }

  submitResolutionClick() {
    this.responseID$.subscribe((ids) => {
      console.log(ids[this.displayedIndex]);

      this.responsesService.updateResolution(
        ids[this.displayedIndex],
        this.resolutionForm.value['resolution']
      );
        //refresh the page
        window.location.reload();
    });
  }

  async getResponseData(responseID: string) {
    this.apollo
      .watchQuery<
        GetSurveyResponseDataQuery,
        GetSurveyResponseDataQueryVariables
      >({
        query: GetSurveyResponseDataDocument,
        variables: {
          surveyResponseWhereUniqueInput: {
            id: responseID,
          },
        },
      })
      .valueChanges.subscribe((result) => {
        this.openedDate = formatDate(
          result.data.getSurveyResponseData.openedDate,
          'MMM d yy, h:mm a',
          'en-US'
        );

        // Clear contents of QA array
        this.qas = [];

        // Handle the Questions & Answers
        result.data.getSurveyResponseData.answers?.forEach((answer) => {
          // Clear contents of QA array

          // Create the Question/Answer Array
          this.qas.push([String(answer?.question?.prompt), answer.value]);
        });
      });
  }

  displayIssue(pageEvent: PageEvent): PageEvent {
    if (pageEvent) {
      // Set the resolution
      this.resolutionForm.setValue({
        resolution: '',
      });
      this.responseID$.subscribe((ids) => {
        this.displayedIndex = pageEvent.pageIndex;
        this.getResponseData(ids[this.displayedIndex]);
      });
    }
    return pageEvent;
  }
}

// Suppose our profile query took an avatar size
