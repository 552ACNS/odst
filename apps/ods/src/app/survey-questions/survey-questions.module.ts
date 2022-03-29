import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { SurveyQuestionsComponent } from './survey-questions.component';
import { SurveyQuestionsRoutes } from './survey-questions.routing';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [SurveyQuestionsComponent],
    imports: [
        RouterModule.forChild(SurveyQuestionsRoutes),
        CommonModule, 
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
        MatCheckboxModule,
        FormsModule
    ],
    exports: []
  })
  export class SurveryQuestionsModule {}