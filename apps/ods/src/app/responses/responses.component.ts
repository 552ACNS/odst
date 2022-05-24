import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResponsesService } from './responses.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AddCommentMutationVariables,
  FindUniqueSurveyResponseQuery,
  UpdateResolvedMutationVariables,
} from './responses.generated';
import { getRefreshToken, getUserId } from '@odst/helpers';

@Component({
  selector: 'odst-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit {
  resolutionForm = this.fb.group({
    comment: [''],
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

  AddCommentMutationVariables: AddCommentMutationVariables;

  newComment = '';
  // TODO: Change resolved status back to bool
  resolved: string;

  // This is for the toggle button
  actualResolution: boolean;

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

  submitComment() {
    // if the resolution field is not empty after a trim
    if (this.resolutionForm.value.comment.trim() !== '') {
      this.AddCommentMutationVariables = {
        where: {
          id: this.responseIDs[this.displayedIndex],
        },
        data: {
          comments: {
            create: [
              {
                value: this.resolutionForm.value.comment.trim(),
                author: {
                  connect: {
                    id: this.userId,
                  },
                },
              },
            ],
          },
        },
      };

      this.responsesService
        .addComment(this.AddCommentMutationVariables)
        .subscribe(({ data, errors }) => {
          if (!errors && data) {
            // Refresh comments afterwards
            this.comments = data.updateSurveyResponse['comments'];
            this.actualResolution = data.updateSurveyResponse['resolved'];
            this.resolutionForm.reset();
          }
        });
    }
  }

  updateResolved() {
    const updateResolvedMutationVariables: UpdateResolvedMutationVariables = {
      where: {
        id: this.responseIDs[this.displayedIndex],
      },
      data: {
        resolved: {
          set: !this.actualResolution,
        },
      },
    };

    this.responsesService
      .updateResolved(updateResolvedMutationVariables)
      .subscribe(({ data, errors }) => {
        if (!errors && data) {
          this.actualResolution = data.updateSurveyResponse['resolved'];
        }
      });
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

          this.comments = data.findUniqueSurveyResponse.comments;

          this.actualResolution = data.findUniqueSurveyResponse['resolved'];
        }
      }
    );
  }

  displayIssue(pageEvent: PageEvent): PageEvent {
    if (pageEvent) {
      //TODO rewrite with proper pagination
      this.displayedIndex = pageEvent.pageIndex;

      this.getResponseData(this.responseIDs[this.displayedIndex]);
    }
    return pageEvent;
  }

  //TODO [ODST-133] IMPORTANT: set to first page on load
}
