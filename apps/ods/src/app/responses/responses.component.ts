import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ResponsesService } from './responses.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'odst-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
})
export class ResponsesComponent implements OnInit {
  resolutionForm = this.fb.group({
    resolution: ['', [Validators.required]],
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

  resolved: string;

  openedDate: string;
  numberOfResponses: number;
  displayedIndex: number;

  responseIDs: string[] = [];

  pageEvent: PageEvent;

  async ngOnInit() {
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
      ({ data, errors }) => {
        //one reason to not use pluck/map/whatever is it drops the errors and
        //they're never seen/handled. Not that we're doing much of that right now
        if (errors) {
          alert(errors);
        }
        if (data) {
          this.openedDate = formatDate(
            data.findUniqueSurveyResponse.openedDate,
            'MMM d yy, h:mm a',
            'en-US'
          );

          if (this.resolved) {
            this.resolutionForm.setValue({
              resolution: data.findUniqueSurveyResponse.resolution,
            });
          }

          // Clear contents of QA array
          this.questionsAnswers = [];

          // Handle the Questions & Answers
          data.findUniqueSurveyResponse.answers?.forEach((answer) => {
            // Clear contents of QA array
            // Create the Question/Answer Array
            this.questionsAnswers.push([
              String(answer?.question?.prompt),
              answer.value,
            ]);
          });
        }
      }
    );
  }

  displayIssue(pageEvent: PageEvent): PageEvent {
    if (pageEvent) {
      // Set the resolution
      this.resolutionForm.setValue({
        resolution: '',
      });

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

// Suppose our profile query took an avatar size
