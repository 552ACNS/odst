import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ResponseLookupService } from './response-lookup.service';

@Component({
  selector: 'odst-response-lookup',
  templateUrl: './response-lookup.component.html',
  styleUrls: ['./response-lookup.component.scss'],
})
export class ResponseLookupComponent {
  openedDate: Date;
  closedDate: Date | null;
  status: boolean;
  tags: string[];
  grade?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  success: boolean;
  submitError: boolean;
  resolvedComment?: string | null;
  constructor(
    private fb: UntypedFormBuilder,
    private lookupService: ResponseLookupService
  ) {}
  form = this.fb.group({
    reportID: ['', [Validators.required]],
  });

  async submit() {
    (
      await this.lookupService.getFeedbackResponseById(
        this.form.value['reportID'].trim()
      )
    ).subscribe(({ data, errors }) => {
      if (!errors && !!data) {
        this.openedDate = data.feedbackResponseByID.openedDate;
        this.closedDate = data.feedbackResponseByID.closedDate;
        this.status = data.feedbackResponseByID.resolved;
        this.tags = data.feedbackResponseByID.tags;
        this.grade = data.feedbackResponseByID.grade;
        this.firstName = data.feedbackResponseByID.firstName;
        this.lastName = data.feedbackResponseByID.lastName;
        this.resolvedComment = data.feedbackResponseByID.resolvedComment;
        this.success = true;
        this.submitError = false;
      } else {
        this.success = false;
        this.submitError = true;
      }
    });
  }
}
