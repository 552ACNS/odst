import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { SurveyQuestionsComponent } from './survey-questions.component';
import { SurveyQuestionsRoutes } from './survey-questions.routing';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ApolloTestingModule } from 'apollo-angular/build/testing';
@NgModule({
  declarations: [SurveyQuestionsComponent],
  imports: [
    RouterModule.forChild(SurveyQuestionsRoutes),
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    ApolloTestingModule,
    MatOptionModule,
  ],
  exports: [],
})
export class SurveryQuestionsModule {}
