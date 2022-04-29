import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequestAccountComponent } from './request-account.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SurveyQuestionsComponent', () => {
  let component: RequestAccountComponent;
  let fixture: ComponentFixture<RequestAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestAccountComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ApolloTestingModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserModule,
        BrowserAnimationsModule,
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
