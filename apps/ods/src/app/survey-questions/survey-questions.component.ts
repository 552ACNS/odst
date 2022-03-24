import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'odst-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})

export class SurveyQuestionsComponent {

  orgs: string[] = ['552 ACNS', 'Astolfo Gang', 'Random'];
  CCs: string[] = ['Matos, Emmanuel Lt. Col.', 'God Emperer Astolfo', 'MaGoo'];
  constructor(private fb: FormBuilder) { } 
  
  //validators didnt need to be inside the formControlName and caused it to break, so i removed
  //them. Also, all form controls need to be specificed in their or else they all will not
  //load properly.
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
  submit(){
    return;
  }
  back(){
    return;
  }
  // answers: string[] = [
  //   this.form.value['personOrg'],
  //   this.form.value['event'],
  // ]
}
