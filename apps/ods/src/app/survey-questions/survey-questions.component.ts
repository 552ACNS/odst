import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'odst-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})

export class SurveyQuestionsComponent {

  constructor(private fb: FormBuilder) { } 
  form = this.fb.group({
    personOrg: ['', Validators.required],
    event: ['', Validators.required],
    violatorSpec: [Validators.required],
    violatorOtherSpec: [''],
    CC: ['', Validators.required],
    personSpec: [Validators.required],
    personOtherSpec: [''],
    impact: ['', Validators.required],
    outsideRouting: [Validators.required]
  });
  selected = 'option2';
  
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
