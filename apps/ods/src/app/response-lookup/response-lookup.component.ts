import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'odst-response-lookup',
  templateUrl: './response-lookup.component.html',
  styleUrls: ['./response-lookup.component.scss'],
})
export class ResponseLookupComponent {
  constructor(private fb: UntypedFormBuilder) {}
  form = this.fb.group({
    reportID: ['', [Validators.required]],
  });

  submitLoginClick() {}
}
