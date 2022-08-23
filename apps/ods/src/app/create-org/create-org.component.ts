import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Role } from '../../types.graphql';
import { Status } from '../../types.graphql';
import { CreateOrgService } from './create-org.service';
import {
  CustomValidators,
  MyErrorStateMatcher,
  regExps,
  errorMessages,
} from '@odst/shared/angular';

@Component({
  selector: 'odst-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss'],
})
export class CreateOrgComponent implements OnInit {
  //TODO: change to pull group tiers from backend
  groupTiers = ['Wing', 'Group', 'Squadron'];
  orgs: Observable<string[]>;
  submitSuccess = false;
  matcher = new MyErrorStateMatcher();
  errors = errorMessages;

  constructor(
    private fb: UntypedFormBuilder,
    private createOrgService: CreateOrgService
  ) {}
  //TODO: Make N/A an option
  async ngOnInit(): Promise<void> {
    this.orgs = await this.createOrgService.getOrgNames();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = this.fb.group(
    {
      orgTier: ['', [Validators.required]],
      groupName: ['', [Validators.required]],
      confirmName: ['', [Validators.required]],
      parentOrg: ['', [Validators.required]],
      childOrg: ['', [Validators.required]],
    },
    { validators: CustomValidators.matchingNames }
  );

  submit() {
    this.submitSuccess = true;
  }
}
