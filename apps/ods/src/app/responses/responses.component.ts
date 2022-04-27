import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResponsesService } from './responses.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  resolved: boolean;

  openedDate: string;
  numberOfResponses: number;
  displayedIndex: number;

  responseIDs: string[] = [];

  pageEvent: PageEvent;

  async ngOnInit() {
    // Get resolved value form route params
    this.route.queryParams.subscribe(async (params) => {
      this.resolved = params['resolved'] === 'true';
    });

    (
      await this.responsesService.getResponseIDsByStatus(this.resolved)
    ).subscribe((data) => {
      this.responseIDs = data;
      this.numberOfResponses = data.length;

      this.pageEvent = { pageIndex: 0, pageSize: 1, length: 1 };

      // navigate to that issue
      this.displayIssue(this.pageEvent);
    });
  }

  submitResolutionClick() {
    // if the resolution field is not empty after a trim
    if (this.resolutionForm.value.resolution.trim() !== '') {
      this.responsesService.updateResolution(
        this.responseIDs[this.displayedIndex],
        this.resolutionForm.value['resolution']
      );

      //refresh the page
      window.location.reload();
    }
  }

  async getResponseData(responseID: string) {
    (await this.responsesService.getResponseData(responseID)).subscribe(
      (data) => {
        this.openedDate = formatDate(
          data.openedDate,
          'MMM d yy, h:mm a',
          'en-US'
        );

        if (this.resolved) {
          this.resolutionForm.setValue({
            resolution: data.resolved,
          });
        }

        // Clear contents of QA array
        this.questionsAnswers = [];

        // Handle the Questions & Answers
        data.answers?.forEach((answer) => {
          // Clear contents of QA array
          // Create the Question/Answer Array
          this.questionsAnswers.push([
            String(answer?.question?.prompt),
            answer.value,
          ]);
        });
      }
    );
  }

  displayIssue(pageEvent: PageEvent): PageEvent {
    if (pageEvent) {
      // Set the resolution
      this.resolutionForm.setValue({
        resolution: '',
      });

      this.displayedIndex = pageEvent.pageIndex;

      this.getResponseData(this.responseIDs[this.displayedIndex]);
    }
    return pageEvent;
  }

  //TODO [ODST-133] IMPORTANT: set to first page on load
}

// Suppose our profile query took an avatar size
