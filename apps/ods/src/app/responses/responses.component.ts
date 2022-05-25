import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ResponsesService } from './responses.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs';
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
  //start for tags
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeyCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['Gender'];
  allTags: string[] = [
    'Gender',
    'Sexism',
    'Race',
    'Racism',
    'Sexuality',
    'Gender Identity',
    'Religion',
    'Mental Health',
    'Minority',
    'Marginalized',
    'Mental Illness',
    'Rank',
    'Observed',
    'Experienced',
    'Other',
    'Harassment *',
    'Assault *',
    'Discrimination *',
  ];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  //end for tags
  constructor(
    private fb: FormBuilder,
    private responsesService: ResponsesService,
    private route: ActivatedRoute
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );
  }

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
  //start code for tags

  // eslint-disable-next-line complexity
  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.chipInput?.inputElement;
      const value = event.value;

      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.ariaValueText = '';
    this.tagCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }
  //end code for tags
  //TODO [ODST-133] IMPORTANT: set to first page on load
}
