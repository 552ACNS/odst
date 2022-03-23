import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'odst-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})

export class SurveyQuestionsComponent {

  constructor(private fb: FormBuilder,) { } 
  form = this.fb.group({
    personOrg: ['', Validators.required],
    event: ['', Validators.required],
  });
  selected = 'option2';

  // answers: string[] = [
  //   this.form.value['personOrg'],
  //   this.form.value['event'],
  // ]
}
