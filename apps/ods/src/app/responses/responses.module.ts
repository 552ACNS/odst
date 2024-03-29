import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResponsesComponent } from './responses.component';
import { ResponsesRoutes } from './responses.routing';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectTagsComponent } from './select-tags/select-tags.component';
import { CommentsComponent } from '../components/comments/comments.component';
@NgModule({
  declarations: [ResponsesComponent, SelectTagsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ResponsesRoutes),
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSnackBarModule,
    CommentsComponent,
  ],
})
export class ResponsesModule {}
