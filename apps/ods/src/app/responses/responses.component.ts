import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResponsesService } from './responses.service';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AddCommentMutationVariables,
  GetReportByStatusQuery,
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

  tagCtrl = new UntypedFormControl();

  possibleTags: string[] = [];

  selectedTags: string[] | undefined = [];

  allTags: string[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private responsesService: ResponsesService,
    private route: ActivatedRoute
  ) {}

  questionsAnswers: [string, string][] = [];
  // comments: [string, string, string, any?][] = [];
  comments: GetReportByStatusQuery['getIssuesByStatus'][0]['comments'] = [];

  AddCommentMutationVariables: AddCommentMutationVariables;

  newComment = '';
  // TODO: Change resolved status back to bool
  status: string;

  // This is for the toggle button
  actualResolution: boolean;

  openedDate: Date;

  userId: string;

  numberOfResponses: number;

  displayedIndex: number;

  pageEvent: PageEvent;

  take = 1;
  response: GetReportByStatusQuery['getIssuesByStatus'][0];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  async ngOnInit() {
    this.getFeedback(0);
  }
  //uses this method in lieu of displaydata method(which was deleted)
  handlePageEvent(pageEvent: PageEvent): PageEvent {
    if (pageEvent) {
      this.displayedIndex = pageEvent.pageIndex;

      this.getFeedback(this.displayedIndex);
    }
    return pageEvent;
  }

  async getFeedback(index: number) {
    //TODO pull this from id token once implemented in ODST-33
    this.userId = getUserId(getRefreshToken() ?? '');

    this.allTags = this.responsesService.getTags();
    this.generatePossibleTags();

    // Get resolved value form route params
    this.route.queryParams.subscribe(async (params) => {
      this.status = params['resolved'];
    });
    //method takes the status of the response, the index its querying for, and the number of responses to take
    (
      await this.responsesService.getReportByStatus(
        this.status,
        index,
        this.take
      )
    )
      // eslint-disable-next-line complexity
      .subscribe(({ data }) => {
        //it then uses the data to determin the current status and gets and displays the other appropriate data
        if (this.numberOfResponses !== 0) {
          this.pageEvent = { pageIndex: 0, pageSize: 1, length: 1 };
        }
        //took the get data method and put it in our new method, this one
        switch (this.status) {
          case 'unresolved':
            this.numberOfResponses = data.ResponseCount.unresolved;
            this.pageEvent.length = data.ResponseCount.unresolved;
            break;
          case 'resolved':
            this.numberOfResponses = data.ResponseCount.resolved;
            this.pageEvent.length = data.ResponseCount.resolved;
            break;
          case 'overdue':
            this.numberOfResponses = data.ResponseCount.overdue;
            this.pageEvent.length = data.ResponseCount.overdue;
            break;
        }

        this.response = data.getIssuesByStatus[0];

        this.openedDate = this.response.openedDate;

        // Clear contents of QA array
        this.questionsAnswers = [];
        this.comments = [];

        // Handle the Questions & Answers
        this.response.answers?.forEach((answer) => {
          // Clear contents of QA array
          // Create the Question/Answer Array
          this.questionsAnswers.push([
            String(answer?.question?.value),
            answer.value,
          ]);
        });

        this.comments = this.response.comments;

        this.actualResolution = this.response['resolved'];

        this.selectedTags = this.response['tags']?.map((x) => x.value);
        this.generatePossibleTags();
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
          id: this.response.id,
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
        id: this.response.id,
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

  /**
   * Removes tag deselected by the user and adds it back to the list of tags not in use
   * @param tagToRemove tag that's been deselected by the user
   */

  // there's some duplication in this code
  remove(tagToRemove: string): void {
    this.responsesService
      .modifyTag({
        where: { id: this.response.id },
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
          where: { id: this.response.id },
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
        where: { id: this.response.id },
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
}
