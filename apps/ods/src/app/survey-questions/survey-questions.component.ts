import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  CreateSurveyWithQuestions_FormDocument,
  CreateSurveyWithQuestions_FormMutation,
  CreateSurveyWithQuestions_FormMutationVariables,
  FindManyOrgs_FormDocument,
  FindManyOrgs_FormQuery,
  FindManyOrgs_FormQueryVariables,
  OrgGql,
} from '../../graphql-generated';

@Component({
  selector: 'odst-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss'],
})
export class SurveyQuestionsComponent implements OnInit, OnDestroy {
  questions = [
    'What squadron did the event occur in?',
    'Please describe the event of a microaggression or discrimination that took place in your squadron. Please refrain from using names or identifying information.',
    'Please describe the mircroaggression or discrimination that took place.',
    'Was the person performing the microaggression or discrimination active duty, civilian, guard/reserve or a contractor?',
    'Are you active duty, a civilian, guard/reserve or contractor?',
    'What impacts did this event have on you or your work environment',
  ];

  outsideRouting = false;
  answers: string[];
  openDate = new Date();
  orgs: Partial<OrgGql>[];
  CCs: string[] = ['Matos, Emmanuel Lt Col', 'Baker, John Lt Col'];
  querySubscription: Subscription;
  loading = true;
  submitSuccess = false;
  violatorSpec = { name: '' };
  personSpec = { name: '' };
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private _violatorOption: string = '';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private _customViolator: string = '';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private _personOption: string = '';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private _customPerson: string = '';
  constructor(private fb: FormBuilder, private apollo: Apollo) {}

  get violatorOption(): string {
    return this._violatorOption;
  }
  set violatorOption(value: string) {
    this._violatorOption = value;
    this.updateRadioName();
  }
  get customViolator(): string {
    return this._customViolator;
  }
  set customViolator(value: string) {
    this._customViolator = value;
    this.updateRadioName();
  }
  get personOption(): string {
    return this._personOption;
  }
  set personOption(value: string) {
    this._personOption = value;
    this.updateRadioName();
  }
  get customPerson(): string {
    return this._customPerson;
  }
  set customPerson(value: string) {
    this._customPerson = value;
    this.updateRadioName();
  }
  private updateRadioName(): void {
    this.violatorSpec.name =
      this._violatorOption === 'other'
        ? this.form.value['violatorOtherSpec']
        : this._violatorOption;
    this.personSpec.name =
      this._personOption === 'other'
        ? this.form.value['personOtherSpec']
        : this._personOption;
  }

  //validators didnt need to be inside the formControlName and caused it to break, so i removed
  //them. Also, all form controls need to be specificed in their or else they all will not
  //load properly.
  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = this.fb.group({
    eventOrg: [],
    event: [],
    violatorSpec: ['AD'],
    violatorOtherSpec: [],
    CC: [],
    personSpec: [],
    personOtherSpec: [],
    impact: [],
    outsideRouting: [],
  });

  async ngOnInit(): Promise<void> {
    this.querySubscription = this.apollo
      .watchQuery<FindManyOrgs_FormQuery, FindManyOrgs_FormQueryVariables>({
        query: FindManyOrgs_FormDocument,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.orgs = data.findManyOrgs;
      });
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
    this.apollo
      .mutate<
        CreateSurveyWithQuestions_FormMutation,
        CreateSurveyWithQuestions_FormMutationVariables
      >({
        mutation: CreateSurveyWithQuestions_FormDocument,
        variables: {
          questionPrompts: this.questions,
        },
      })
      .subscribe();
    // this.answers = [
    //   this.form.get(['eventOrg'])?.value,
    //   this.form.value['event'],
    //   this.violatorSpec.name,
    //   this.form.value['CC'],
    //   this.personSpec.name,
    //   this.form.value['impact'],
    //   this.outsideRoutingWorking()
    // ]
    // this.submitSuccess=true;
    // return alert(this.answers)
  }
  back() {
    return;
  }
  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}

