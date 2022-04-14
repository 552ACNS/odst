import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { SurveyQuestionsService } from './survey-questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'odst-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss'],
})
export class SurveyQuestionsComponent implements OnInit, OnDestroy {
  questions = [
    'What squadron did the event occur in?',
    'Please describe the event of a microaggression or discrimination that took place in your squadron. Please refrain from using names or identifying information.',
    'Was the person performing the microaggression or discrimination active duty, civilian, guard/reserve or a contractor?',
    'Who is your SQ/CC?',
    'Are you active duty, a civilian, guard/reserve or contractor?',
    'What impacts did this event have on you or your work environment?',
  ];

  questionIDs: string[];
  surveyID?: string;

  outsideRouting = false;
  answers: string[];
  openDate = new Date();
  orgs: Observable<string[]>;
  CCs: string[] = ['Matos, Emmanuel Lt. Col.'];
  querySubscription: Subscription;
  loading = true;
  submitSuccess = false;
  violatorSpec = '';
  personSpec = '';

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private surveyService: SurveyQuestionsService
  ) {}

  private violatorSpecification(): string {
    if (this.form.value['violatorSpec'] === 'other') {
      return this.form.value['violatorOtherSpec'];
    } else {
      return this.form.value['violatorSpec'];
    }
  }
  private personSpecification(): string {
    if (this.form.value['personSpec'] === 'other') {
      return this.form.value['personOtherSpec'];
    } else {
      return this.form.value['personSpec'];
    }
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
    this.orgs = await this.surveyService.getManyOrgs();
  }
  //TODO find out a way to fix without this
  outsideRoutingWorking(): boolean {
    if (this.form.get(['outsideRouting'])?.value == true) {
      return true;
    } else {
      return false;
    }
  }
  submit() {
    this.answers = [
      this.form.get(['eventOrg'])?.value,
      this.form.value['event'].trim(),
      this.violatorSpecification(),
      this.form.value['CC'],
      this.personSpecification(),
      this.form.value['impact'].trim(),
      this.outsideRoutingWorking(),
    ];

    // TODO: Nested behaviors like this are hard to test.
    this.surveyService
      .submitWithQuestions(this.questions)
      .subscribe(({ data, errors }) => {
        this.surveyID = data?.createSurveyWithQuestions.id;
        this.surveyService
          .getQuestionsFromSurvey(<string>this.surveyID)
          .subscribe((data) => {
            this.questionIDs = data;
            this.surveyService
              .submitSurveyReponse(
                this.outsideRoutingWorking(),
                this.answers,
                this.questionIDs,
                this.surveyID
              )
              .subscribe(({ data, errors }) => {
                this.submitSuccess = !errors;
              });
          });
      });
  }
  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
