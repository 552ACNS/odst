import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { EditOrgService } from './edit-org.service';
import {
  CustomValidators,
  MyErrorStateMatcher,
  regExpForOrgNames,
  errorMessagesForOrgNames,
} from '@odst/shared/angular';

@Component({
  selector: 'odst-create-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.scss'],
})
export class EditOrgComponent implements OnInit {
  userOrgs: string[];
  matcher = new MyErrorStateMatcher();
  errors = errorMessagesForOrgNames;
  submitSuccess = false;
  submitError = false;

  constructor(
    private fb: UntypedFormBuilder,

    private editOrgService: EditOrgService
  ) {}
  async ngOnInit(): Promise<void> {
    (await this.editOrgService.getUserOrgsNames()).subscribe((orgNames) => {
      this.userOrgs = orgNames;
    });
  }
  //TODO: Make N/A an option for children and parent

  //TODO: make sure it kicks back an error visible to the user if unit name already exists
  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = this.fb.group(
    {
      orgToEdit: ['', [Validators.required]],
      orgName: [
        '',
        [Validators.required, Validators.pattern(regExpForOrgNames['orgName'])],
      ],
      confirmName: ['', [Validators.required]],
    },
    { validators: CustomValidators.matchingNames }
  );

  async submit() {
    (
      await this.editOrgService.updateOrg({
        where: { name: this.form.value.orgToEdit },
        data: { name: this.form.value.orgName },
      })
    ).subscribe(({ data, errors }) => {
      if (!errors && !!data) {
        this.submitSuccess = true;
        this.submitError = false;
      } else {
        this.submitSuccess = false;
        this.submitError = true;
      }
    });
    //TODO: add tooltip for regex.
  }
}
