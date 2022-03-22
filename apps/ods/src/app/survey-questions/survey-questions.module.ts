import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SurveyQuestionsComponent } from './survey-questions.component';
import { SurveyQuestionsRoutes } from './survey-questions.routing';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [SurveyQuestionsComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,      
        MatCheckboxModule,
        MatIconModule,       
        RouterModule.forChild(SurveyQuestionsRoutes)
    ],
    exports: []
  })
  export class SurveryQuestionsModule {}