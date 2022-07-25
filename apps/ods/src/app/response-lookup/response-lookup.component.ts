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
  success: boolean;
  submitError: boolean;
  constructor(
    private fb: UntypedFormBuilder,
    private lookupService: ResponseLookupService
  ) {}
  form = this.fb.group({
    reportID: ['', [Validators.required]],
  });

  async submit() {
    (
      await this.lookupService.getFeedbackReponseById(
        this.form.value['reportID'].trim()
      )
    ).subscribe(({ data, errors }) => {
      if (!errors && !!data) {
        this.openedDate = data.feedbackResponseByID.openedDate;
        this.closedDate = data.feedbackResponseByID.closedDate;
        this.status = data.feedbackResponseByID.resolved;
        this.tags = data.feedbackResponseByID.tags;
        this.success = true;
        this.submitError = false;
      } else {
        this.success = false;
        this.submitError = true;
      }
    });
  }
}
