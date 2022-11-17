import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GetReportByStatusQuery } from '../../responses/responses.generated';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '@odst/shared/angular';

@Component({
  selector: 'odst-comments',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: GetReportByStatusQuery['getIssuesByStatus'][0]['comments'];
  @Input() userId: string;
  @Output() commentToSubmit = new EventEmitter<string>();

  // addComment = new FormGroup({
  newComment = new FormControl('', [
    Validators.required,
    CustomValidators.noWhitespaceValidator,
  ]);
  // });

  constructor() {
    console.log('CommentsComponent');
  }

  ngOnInit(): void {
    console.log('CommentsComponent');
  }

  submitComment() {
    this.commentToSubmit.emit(this.newComment.value?.trim());
    this.newComment.reset();
  }

  resetField() {
    // if the field is empty or only contains whitespace, reset it
    if (this.newComment.value === '' || this.newComment.value === null) {
      this.newComment.reset();
    }
  }
}
