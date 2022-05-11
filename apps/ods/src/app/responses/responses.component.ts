import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResponsesService } from './responses.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentGql, UserGql } from '../../types.graphql';
import { FindUniqueSurveyResponseQuery } from './responses.generated';
import { getRefreshToken, getUserId } from '@odst/helpers';

import {
  GetIssuesByStatusDocument,
  GetIssuesByStatusQuery,
  GetIssuesByStatusQueryVariables,
  FindUniqueSurveyResponseDocument,
  FindUniqueSurveyResponseQueryVariables,
  UpdateSurveyResponseDocument,
  UpdateSurveyResponseMutation,
  UpdateSurveyResponseMutationVariables,
} from './responses.generated';

@Component({
  selector: 'odst-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit {
  resolutionForm = this.fb.group({
    resolution: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private responsesService: ResponsesService,
    private route: ActivatedRoute
  ) {}

  questionsAnswers: [string, string][] = [];
  // comments: [string, string, string, any?][] = [];
  comments: FindUniqueSurveyResponseQuery['findUniqueSurveyResponse']['comments'] =
    [];

  updateSurveyResponseMutationVariables: UpdateSurveyResponseMutationVariables;

  newComment = '';
  resolved: string;
  //TODO: talk to sim later and find out if there is already a way to get the current date, did not see it here
  openedDate: Date;

  userId: string;

  numberOfResponses: number;
  displayedIndex: number;

  responseIDs: string[] = [];

  pageEvent: PageEvent;

  async ngOnInit() {
    this.userId = getUserId(getRefreshToken() ?? '');

    // Get resolved value form route params
    this.route.queryParams.subscribe(async (params) => {
      this.resolved = params['resolved'];
    });

    (
      await this.responsesService.getResponseIDsByStatus(this.resolved)
    ).subscribe((data) => {
      this.responseIDs = data;
      this.numberOfResponses = data.length;

      if (this.numberOfResponses !== 0) {
        this.pageEvent = { pageIndex: 0, pageSize: 1, length: 1 };

        // navigate to that issue
        this.displayIssue(this.pageEvent);
      }
    });
  }

  submitResolutionClick() {
    console.log(this.resolutionForm.value.resolution.trim());
    // if the resolution field is not empty after a trim
    if (this.resolutionForm.value.resolution.trim() !== '') {
      this.newComment = this.resolutionForm.value.resolution.trim();

      this.updateSurveyResponseMutationVariables = {
        surveyResponseWhereUniqueInput: {
          id: this.responseIDs[this.displayedIndex],
        },
        surveyResponseUpdateInput: {
          comments: {
            create: {
              value: this.resolutionForm.value.resolution.trim(),
              author: {
                connect: {
                  id: this.userId,
                },
              },
            },
          },
        },
      };

      this.responsesService.updateSurveyResponseComments(
        this.updateSurveyResponseMutationVariables
      );
      // .then(() => {
      //   //refresh the page
      //   window.location.reload();
      // });
    }
  }

  async getResponseData(responseID: string) {
    (await this.responsesService.getResponseData(responseID)).subscribe(
      ({ data, errors }) => {
        //one reason to not use pluck/map/whatever is it drops the errors and
        //they're never seen/handled. Not that we're doing much of that right now
        if (errors) {
          alert(errors);
        }
        if (data) {
          this.openedDate = data.findUniqueSurveyResponse.openedDate;

          // Clear contents of QA array
          this.questionsAnswers = [];
          this.comments = [];

          // Handle the Questions & Answers
          data.findUniqueSurveyResponse.answers?.forEach((answer) => {
            // Clear contents of QA array
            // Create the Question/Answer Array
            this.questionsAnswers.push([
              String(answer?.question?.prompt),
              answer.value,
            ]);
          });

          // if (this.resolved) {
          this.comments = data.findUniqueSurveyResponse.comments;
          // this.resolutionForm.setValue({
          //   resolution: data.findUniqueSurveyResponse.comments,
          // });
          // }
        }
      }
    );
  }

  displayIssue(pageEvent: PageEvent): PageEvent {
    if (pageEvent) {
      // Set the resolution
      // this.resolutionForm.setValue({
      //   resolution: '',
      // });

      //TODO rewrite with proper pagination
      this.displayedIndex = pageEvent.pageIndex;

      this.getResponseData(this.responseIDs[this.displayedIndex]);
    }
    return pageEvent;
  }

  //TODO [ODST-133] IMPORTANT: set to first page on load
}

// Suppose our profile query took an avatar size
