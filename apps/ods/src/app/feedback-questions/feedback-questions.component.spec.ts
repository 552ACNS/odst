import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FeedbackQuestionsComponent } from './feedback-questions.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FeedbackQuestionsComponent', () => {
  let component: FeedbackQuestionsComponent;
  let fixture: ComponentFixture<FeedbackQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackQuestionsComponent],
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
        MatRadioModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockCreateOrgService = {
    //reference create-org.component.spec.ts for this
  };

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should make other input required when other radio button is selected for violator', () => {
    component.form.setValue({
      eventOrg: '552 ACNS',
      event: 'I was violated viciously with words',
      violatorSpec: 'other',
      violatorSpecOther: '',
      CC: 'Matos',
      personSpec: 'other',
      personSpecOther: 'Hickey',
      impact: 'I felt bad',
      outsideRouting: false,
    });
    const radioGroup = fixture.debugElement.query(
      By.css('#violatorSpecID')
    ).nativeElement;
    radioGroup.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('#btnSubmit'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    component.form.setValue({
      eventOrg: '552 ACNS',
      event: 'I was violated viciously with words',
      violatorSpec: 'other',
      violatorSpecOther: 'Sherrit',
      CC: 'Matos',
      personSpec: 'other',
      personSpecOther: 'Hickey',
      impact: 'I felt bad',
      outsideRouting: false,
    });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should make other input required when other radio button is selected for person', () => {
    component.form.setValue({
      eventOrg: '552 ACNS',
      event: 'I was violated viciously with words',
      violatorSpec: 'other',
      violatorSpecOther: 'Sherrit',
      CC: 'Matos',
      personSpec: 'other',
      personSpecOther: '',
      impact: 'I felt bad',
      outsideRouting: false,
    });
    const radioGroup = fixture.debugElement.query(
      By.css('#personSpecID')
    ).nativeElement;
    radioGroup.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('#btnSubmit'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    component.form.setValue({
      eventOrg: '552 ACNS',
      event: 'I was violated viciously with words',
      violatorSpec: 'other',
      violatorSpecOther: 'Sherrit',
      CC: 'Matos',
      personSpec: 'other',
      personSpecOther: 'Hickey',
      impact: 'I felt bad',
      outsideRouting: false,
    });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });
});
