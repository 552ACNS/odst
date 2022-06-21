import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResponsesService } from './responses.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AddCommentMutationVariables,
  FindUniqueFeedbackResponseQuery,
  UpdateResolvedMutationVariables,
} from './responses.generated';
import { getRefreshToken, getUserId } from '@odst/helpers';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'odst-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit {
  resolutionForm = this.fb.group({
    comment: [''],
  });

  //#region Variables
  tagCtrl = new FormControl();

  possibleTags: string[];

  actionTags: string[];

  possibleActionTags: string[] = [];

  selectedActionTags: string[] | undefined = [];

  trackingTags: string[];

  possibleTrackingTags: string[] = [];

  selectedTrackingTags: string[] | undefined = [];

  allTags: string[];

  questionsAnswers: [string, string][] = [];
  // comments: [string, string, string, any?][] = [];
  comments: FindUniqueFeedbackResponseQuery['findUniqueFeedbackResponse']['comments'] =
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

  //#endregion

  constructor(
    private fb: FormBuilder,
    private responsesService: ResponsesService,
    private route: ActivatedRoute
  ) {}

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  //region Main functions
  async ngOnInit() {
    this.userId = getUserId(getRefreshToken() ?? '');

    this.responsesService.getTags().subscribe(({ data }) => {
      this.actionTags = data.getTags
        .filter((tag) => tag.type == 'Action')
        .map((tag) => tag.value);
      this.trackingTags = data.getTags
        .filter((tag) => tag.type == 'DataTracking')
        .map((tag) => tag.value);
      this.allTags = data.getTags.map((tag) => tag.value);
      this.generatePossibleTags();
    });

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

  /**
   * Creates a list of tags that can be added by filtering out those already in use
   */

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
            this.comments = data.updateFeedbackResponse['comments'];
            this.actualResolution = data.updateFeedbackResponse['resolved'];
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
          this.actualResolution = data.updateFeedbackResponse['resolved'];
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
          this.openedDate = data.findUniqueFeedbackResponse.openedDate;

          // Clear contents of QA array
          this.questionsAnswers = [];
          this.comments = [];

          // Handle the Questions & Answers
          data.findUniqueFeedbackResponse.answers?.forEach((answer) => {
            // Clear contents of QA array
            // Create the Question/Answer Array
            this.questionsAnswers.push([
              String(answer?.question?.value),
              answer.value,
            ]);
          });

          this.comments = data.findUniqueFeedbackResponse.comments;

          this.actualResolution = data.findUniqueFeedbackResponse['resolved'];

          this.selectedActionTags = data.findUniqueFeedbackResponse['tags']
            ?.filter((tag) => tag.type == 'Action')
            .map((tag) => tag.value);

          this.selectedTrackingTags = data.findUniqueFeedbackResponse['tags']
            ?.filter((tag) => tag.type == 'DataTracking')
            .map((tag) => tag.value);

          this.generatePossibleTags();
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
  //#endregion

  //#region Tag functions

  /**
   * User selects a tag from the list of unused and the list of unused tags is updated
   * @param event
   * @returns list of tags to push to server
   */

  // TODO fix complexity of this function
  // There is a bug where if the user types and then deletes their input, the possible tags will not repopulate
  add(event: MatChipInputEvent): void {
    // Trim the input so that empty values aren't there
    let value = (event.value || '').trim().toLowerCase();

    // Convert to title case
    value = value[0].toUpperCase() + value.slice(1);

    // If the hand typed value is one of the legal tags
    if (
      this.allTags.includes(value) &&
      !this.selectedActionTags?.concat(this.selectedTrackingTags ?? [])
    ) {
      const tagType = this.determineTagType(value);
      this.responsesService
        .modifyTag({
          where: { id: this.responseIDs[this.displayedIndex] },
          data: { tags: { connect: [{ value: value }] } },
        })
        .subscribe(({ data, errors }) => {
          if (!errors && data?.updateFeedbackResponse['tags']) {
            // Add our tag
            this.addSelectedTags(tagType, value);
            // Clear the input values
            event.chipInput?.clear();
          }
        });
    }

    this.tagCtrl.setValue(null);
    this.generatePossibleTags();
  }

  remove(tagToRemove: string): void {
    const tagType = this.determineTagType(tagToRemove);
    this.responsesService
      .modifyTag({
        where: { id: this.responseIDs[this.displayedIndex] },
        data: { tags: { disconnect: [{ value: tagToRemove }] } },
      })
      .subscribe(({ data, errors }) => {
        if (!errors && data) {
          this.removeSelectedTags(tagType, tagToRemove);
          this.generatePossibleTags();
        }
      });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // If the user already has the tag, don't add it again
    if (
      this.selectedActionTags?.includes(event.option.value) ||
      this.selectedTrackingTags?.includes(event.option.value)
    )
      return;
    const type = this.determineTagType(event.option.value);
    this.responsesService
      .modifyTag({
        where: { id: this.responseIDs[this.displayedIndex] },
        data: { tags: { connect: [{ value: event.option.viewValue }] } },
      })
      .subscribe(({ data, errors }) => {
        if (!errors && data) {
          this.addSelectedTags(type, event.option.value);
          this.tagCtrl.setValue(null);
          this.generatePossibleTags();
        }
      });
  }

  determineTagType(tag: string): string {
    if (this.actionTags?.includes(tag)) return 'Action';
    if (this.trackingTags?.includes(tag)) return 'DataTracking';
    return 'Not a tag';
  }

  addSelectedTags(tagType: string, tagToAdd: string) {
    if (tagType == 'Action') {
      this.selectedActionTags?.push(tagToAdd);
    } else if (tagType == 'DataTracking') {
      this.selectedTrackingTags?.push(tagToAdd);
    } else {
      console.error('Tag type not recognized');
    }
  }

  removeSelectedTags(tagType: string, tagToRemove: string) {
    if (tagType == 'Action') {
      this.selectedActionTags = this.selectedActionTags?.filter(
        (selectedtag) => selectedtag !== tagToRemove
      );
    } else if (tagType == 'DataTracking') {
      this.selectedTrackingTags = this.selectedTrackingTags?.filter(
        (selectedtag) => selectedtag !== tagToRemove
      );
    }
  }

  /**
   * Creates a list of tags that can be added by filtering out those already in use
   */
  generatePossibleTags() {
    this.possibleActionTags = this.actionTags.filter(
      (tag) => !this.selectedActionTags?.includes(tag)
    );
    this.possibleTrackingTags = this.trackingTags.filter(
      (tag) => !this.selectedTrackingTags?.includes(tag)
    );
  }

  //#endregion
}
