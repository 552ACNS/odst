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
import { FeedbackQuestionsComponent } from './feedback-questions.component';
import { FeedbackQuestionsRoutes } from './feedback-questions.routing';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [FeedbackQuestionsComponent],
  imports: [
    RouterModule.forChild(FeedbackQuestionsRoutes),
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [],
})
export class FeedbackQuestionsModule {}
