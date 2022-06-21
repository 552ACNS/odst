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
import { getRefreshToken, getUserId, reloadPage } from '@odst/helpers';
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

  tagCtrl = new FormControl();

  possibleTags: string[] = [];

  selectedTags: string[] | undefined = [];

  allTags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private responsesService: ResponsesService,
    private route: ActivatedRoute
  ) {}

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

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  async ngOnInit() {
    this.userId = getUserId(getRefreshToken() ?? '');

    this.allTags = this.responsesService.getTags();
    this.generatePossibleTags();

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
  generatePossibleTags() {
    this.possibleTags = this.allTags.filter(
      (tag) => !this.selectedTags?.includes(tag)
    );

    const input = this.tagInput?.nativeElement.value.trim().toLowerCase();

    if (input) {
      this.possibleTags = this.possibleTags.filter((tag) =>
        tag.toLowerCase().includes(input)
      );
    }
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
            this.comments = data.updateFeedbackResponse['comments'];
            this.actualResolution = data.updateFeedbackResponse['resolved'];
            this.resolutionForm.reset();
          }
        });
    }
    //reload the page after submitComment finishes
    reloadPage();
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

          this.selectedTags = data.findUniqueFeedbackResponse['tags']?.map(
            (x) => x.value
          );
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

  /**
   * Removes tag deselected by the user and adds it back to the list of tags not in use
   * @param tagToRemove tag that's been deselected by the user
   */

  // there's some duplication in this code
  remove(tagToRemove: string): void {
    this.responsesService
      .modifyTag({
        where: { id: this.responseIDs[this.displayedIndex] },
        data: { tags: { disconnect: [{ value: tagToRemove }] } },
      })
      .subscribe(({ data, errors }) => {
        if (!errors && data) {
          this.selectedTags = this.selectedTags?.filter(
            (selectedtag) => selectedtag !== tagToRemove
          );
        }
      });

    this.generatePossibleTags();
  }

  /**
   * User selects tag or tags and pushes to the database, reset the controller and generate list of unused tags
   * @param event user added a tag
   */

  // there's some duplication in this code
  add(event: MatChipInputEvent): void {
    // Trim the input so that empty values aren't there
    let value = (event.value || '').trim().toLowerCase();

    // Convert to title case
    value = value[0].toUpperCase() + value.slice(1);

    // If the hand typed value is one of the legal tags
    if (this.allTags.includes(value) && !this.selectedTags?.includes(value)) {
      this.responsesService
        .modifyTag({
          where: { id: this.responseIDs[this.displayedIndex] },
          data: { tags: { connect: [{ value: value }] } },
        })
        .subscribe(({ data, errors }) => {
          if (!errors && data) {
            // Add our tag
            this.selectedTags?.push(value);

            // Clear the input values
            if (event.chipInput) {
              event.chipInput.clear();
            }
          }
        });
    }

    this.tagCtrl.setValue(null);
    this.generatePossibleTags();
  }

  /**
   * User selects a tag from the list of unused and the list of unused tags is updated
   * @param event
   * @returns list of tags to push to server
   */

  // There's some duplciation in this code
  selected(event: MatAutocompleteSelectedEvent): void {
    // If the user already has the tag, don't add it again
    if (this.selectedTags?.includes(event.option.value)) return;

    this.responsesService
      .modifyTag({
        where: { id: this.responseIDs[this.displayedIndex] },
        data: { tags: { connect: [{ value: event.option.viewValue }] } },
      })
      .subscribe(({ data, errors }) => {
        if (!errors && data) {
          this.selectedTags?.push(event.option.viewValue);

          this.tagInput.nativeElement.value = '';
          this.tagCtrl.setValue(null);
        }
      });

    this.generatePossibleTags();
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}
