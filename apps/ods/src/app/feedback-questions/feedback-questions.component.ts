import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  RequiredValidator,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FeedbackQuestionsService } from './feedback-questions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'odst-feedback-questions',
  templateUrl: './feedback-questions.component.html',
  styleUrls: ['./feedback-questions.component.scss'],
})
export class FeedbackQuestionsComponent implements OnInit, OnDestroy {
  questions = [
    'What organization did the event occur in?',
    'Please describe the event of a microaggression or discrimination that took place in your organization. Please refrain from using names or identifying information.',
    'Was the person performing the microaggression or discrimination active duty, civilian, guard/reserve or a contractor?',
    'Who is your Commander?',
    'Are you active duty, a civilian, guard/reserve or a contractor?',
    'What impacts did this event have on you or your work environment?',
  ];

  questionIDs: string[];
  feedbackID?: string;
  feedbackResponseID?: string;

  outsideRouting = false;
  answers: string[];
  openDate = new Date();
  orgs: Observable<string[]>;
  CCs: Observable<string[]>;
  querySubscription: Subscription;
  loading = true;
  submitSuccess = false;
  copySuccess = false;
  violatorSpec = '';
  personSpec = '';

  constructor(
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private feedbackService: FeedbackQuestionsService,
    private clipboard: Clipboard
  ) {}

  private violatorSpecification(): string {
    if (this.form.value['violatorSpec'] === 'other') {
      return this.form.value['violatorOtherSpec'].trim();
    } else {
      return this.form.value['violatorSpec'];
    }
  }
  private personSpecification(): string {
    if (this.form.value['personSpec'] === 'other') {
      return this.form.value['personOtherSpec'].trim();
    } else {
      return this.form.value['personSpec'];
    }
  }

  makeViolatorOtherRequired() {
    if (this.form.value['violatorSpec'] === 'other') {
      this.form
        .get(['violatorOtherSpec'])
        ?.setValidators([Validators.required]);
    } else {
      this.form.get(['violatorOtherSpec'])?.clearValidators();
    }
    this.form.get(['violatorOtherSpec'])?.updateValueAndValidity();
  }

  makePersonOtherRequired() {
    if (this.form.value['personSpec'] === 'other') {
      this.form.get(['personOtherSpec'])?.setValidators([Validators.required]);
    } else {
      this.form.get(['personOtherSpec'])?.clearValidators();
    }
    this.form.get(['personOtherSpec'])?.updateValueAndValidity();
  }

  //validators didnt need to be inside the formControlName and caused it to break, so i removed
  //them. Also, all form controls need to be specificed in their or else they all will not
  //load properly.
  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = this.fb.group({
    eventOrg: ['', [Validators.required]],
    event: ['', [Validators.required]],
    violatorSpec: ['', [Validators.required]],
    violatorOtherSpec: [],
    CC: ['', [Validators.required]],
    personSpec: ['', [Validators.required]],
    personOtherSpec: [],
    impact: ['', [Validators.required]],
    outsideRouting: [],
  });

  async ngOnInit() {
    this.orgs = await this.feedbackService.getOrgLineage();
    this.CCs = await this.feedbackService.getCommanders();
  }
  //TODO [ODST-278] find out a way to fix without this
  outsideRoutingWorking(): boolean {
    return this.form.get(['outsideRouting'])?.value == true;
  }
  submit() {
    this.answers = [
      this.form.get(['eventOrg'])?.value,
      this.form.value['event'].trim(),
      this.violatorSpecification(),
      this.form.value['CC'],
      this.personSpecification(),
      this.form.value['impact'].trim(),
    ];

    // TODO: Nested behaviors like this are hard to test.
    // TODO creating the survey should be done via prisma seed or via user input
    this.feedbackService
      .submitWithQuestions(this.questions, {
        name: '552 ACW',
      })
      .subscribe(({ data }) => {
        this.feedbackID = data?.createFeedbackWithQuestions;

        this.feedbackService
          .getQuestionsFromFeedback(<string>this.feedbackID)
          .subscribe((data) => {
            this.questionIDs = data;
            this.feedbackService
              .submitFeedbackReponse(
                this.outsideRoutingWorking(),
                this.answers,
                this.questionIDs,
                this.feedbackID
              )
              .subscribe(({ errors, data }) => {
                this.submitSuccess = !errors && !!data;
                if (this.submitSuccess) {
                  this.feedbackResponseID = data?.createFeedbackResponse;
                } else {
                  this.snackBar.open(
                    'There was an error submitting your issue. Please try again or contact your DEI office.',
                    'Okay'
                  );
                }
              });
          });
      });
  }

  clickedCopyToClipboard() {
    this.clipboard.copy(<string>this.feedbackResponseID);
    this.snackBar.open('Copied Survey ID To Clipboard', '', {
      duration: 3000,
      panelClass: 'primary-text-contrast',
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
