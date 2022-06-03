import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResponsesService } from './responses.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AddCommentMutationVariables,
  FindUniqueSurveyResponseQuery,
  UpdateResolvedMutationVariables,
} from './responses.generated';
import { getRefreshToken, getUserId } from '@odst/helpers';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

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

  // randomMethod() {
  //   const blah = map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTags.slice())),
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  // }

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
  generatePossibleTags() {
    this.possibleTags = this.allTags.filter(
      (tag) => !this.selectedTags?.includes(tag)
    );
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

          this.selectedTags = data.findUniqueSurveyResponse['tags']?.map(
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

  // there's some duplication in this code
  add(event: MatChipInputEvent): void {
    // Trim the input so that empty values aren't there
    let value = (event.value || '').trim().toLowerCase();

    // Convert to title case
    value = value[0].toUpperCase() + value.slice(1);

    // If the hand typed value is one of the elgal tags
    if (this.allTags.includes(value)) {
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

  // There's some duplciation in this code
  selected(event: MatAutocompleteSelectedEvent): void {
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
}
