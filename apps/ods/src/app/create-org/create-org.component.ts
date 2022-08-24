import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrgTier, Role } from '../../types.graphql';
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
  groupTiers = Object.values(OrgTier);
  orgs: Observable<string[]>;
  submitSuccess = false;
  matcher = new MyErrorStateMatcher();
  errors = errorMessages;

  chosenTier: OrgTier;

  orgsBelow: Observable<string[]>;
  orgsAbove: Observable<string[]>;

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

  async getOrgTierAbove(tier: OrgTier) {
    this.orgsAbove = await this.createOrgService.getOrgsByTierAbove(tier);
  }

  async getOrgTierBelow(tier: OrgTier) {
    this.orgsBelow = await this.createOrgService.getOrgsByTierBelow(tier);
  }

  submit() {
    this.submitSuccess = true;
  }
}
