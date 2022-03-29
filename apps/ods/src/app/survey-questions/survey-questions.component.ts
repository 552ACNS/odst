import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { Apollo } from 'apollo-angular';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'odst-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})

export class SurveyQuestionsComponent {

  answers: string[]
  orgs: string[] = ['552 ACNS', 'Astolfo Gang', 'Random'];
  CCs: string[] = ['Matos, Emmanuel Lt. Col.', 'God Emperer Astolfo', 'MaGoo'];
  radioNames = ['Active Duty', 'Civilian', 'Contractor', 'Guard/Reserve'];
  violatorSpec = { name: "" };
  personSpec = { name: ""}
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private _violatorOption: string = "";
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private _customViolator: string = "";
  //querySubscription: Subscription;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private _personOption: string = "";
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private _customPerson: string = "";
  //querySubscription: Subscription;
  constructor(private fb: FormBuilder, ) { } //private apollo: Apollo

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
    this.violatorSpec.name = this._violatorOption === "other" ? this.form.value['violatorOtherSpec'] : this._violatorOption;
    this.personSpec.name = this._personOption === "other" ? this.form.value['personOtherSpec'] : this._personOption;
  }
  
  //validators didnt need to be inside the formControlName and caused it to break, so i removed
  //them. Also, all form controls need to be specificed in their or else they all will not
  //load properly.
  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = this.fb.group({
    personOrg: [],
    event: [],
    violatorSpec: [],
    violatorOtherSpec: [],
    CC: [],
    personSpec: [],
    personOtherSpec: [],
    impact: [],
    outsideRouting: []
  });
  //TODO find out a way to fix without this
  outsideRoutingWorking(): boolean {
    if (this.form.get(['outsideRouting'])?.value == true) {
      return true;
    } else {
      return false;
    }
  }
  submit(){
      this.answers = [
        this.form.value['personOrg'],
        this.form.value['event'],
        this.violatorSpec.name,
        this.form.value['CC'],
        this.personSpec.name,
        this.form.value['impact'],
        this.outsideRoutingWorking()
      ]
      return alert(this.answers)
  }
  back(){
    return;
  }
}
