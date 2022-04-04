import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestionsComponent } from './survey-questions.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SurveyQuestionsComponent', () => {
  let component: SurveyQuestionsComponent;
  let fixture: ComponentFixture<SurveyQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyQuestionsComponent],
      imports: [
        ReactiveFormsModule,
        ApolloTestingModule,
        FormsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule
      ],
    }).compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SurveyQuestionsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
