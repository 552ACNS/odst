import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrgTier } from '../../types.graphql';
import { CreateOrgService } from './create-org.service';
import {
  CustomValidators,
  MyErrorStateMatcher,
  regExpForOrgNames,
  errorMessagesForOrgNames,
} from '@odst/shared/angular';

@Component({
  selector: 'odst-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss'],
})
export class CreateOrgComponent implements OnInit {
  groupTiers: string[];
  submitSuccess = false;
  submitError: boolean;
  matcher = new MyErrorStateMatcher();
  errors = errorMessagesForOrgNames;
  orgsBelow: Observable<string[]>;
  orgsAbove: Observable<string[]>;
  constructor(
    private fb: UntypedFormBuilder,
    private createOrgService: CreateOrgService
  ) {}
  //TODO: Make N/A an option for children and parent

  async ngOnInit(): Promise<void> {
    (await this.createOrgService.getTierByUser()).subscribe((tier) => {
      this.groupTiers = tier;
    });
  }
  //TODO: make sure it kicks back an error visible to the user if unit name already exists
  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = this.fb.group(
    {
      orgTier: ['', [Validators.required]],
      orgName: [
        '',
        [Validators.required, Validators.pattern(regExpForOrgNames['orgName'])],
      ],
      confirmName: ['', [Validators.required]],
      parentOrg: [''],
      childOrg: [''],
    },
    { validators: CustomValidators.matchingNames }
  );

  async getOrgTierAbove(tier: OrgTier) {
    this.orgsAbove = await this.createOrgService.getOrgsByTierAbove(tier);
  }

  async getOrgTierBelow(tier: OrgTier) {
    this.orgsBelow = await this.createOrgService.getOrgsByTierBelow(tier);
  }

  async submit() {
    //TODO: add logic for N/A children and parent
    //TODO: add tooltip for regex.
    (
      await this.createOrgService.createOrg({
        name: this.form.value['confirmName'].toUpperCase().trim(),
        orgTier: this.form.value['orgTier'],
        parent: { connect: { name: this.form.value['parentOrg'] } },
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
  }
  //TODO: add logic for N/A children and parent
  //TODO: fix N/A not being added from backend
  // eslint-disable-next-line complexity
  // submitConditions(): CreateOrgMutationVariables['orgCreateInput'] {
  //   if (
  //     this.form.value['parentOrg'] == 'N/A' &&
  //     this.form.value['childOrg'] == 'N/A'
  //   ) {
  //     return {
  //       name: this.form.value['confirmName'],
  //       orgTier: this.form.value['orgTier'],
  //     };
  //   } else if (
  //     this.form.value['parentOrg'] != 'N/A' &&
  //     this.form.value['childOrg'] != 'N/A'
  //   ) {
  //     return {
  //       name: this.form.value['confirmName'],
  //       orgTier: this.form.value['orgTier'],
  //       parent: <OrgWhereUniqueInput>this.form.value['parentOrg'],
  //       children: <OrgWhereUniqueInput>this.form.value['childOrg'],
  //     };
  //   } else if (
  //     this.form.value['parentOrg'] != 'N/A' &&
  //     this.form.value['childOrg'] == 'N/A'
  //   ) {
  //     return {
  //       name: this.form.value['confirmName'],
  //       orgTier: this.form.value['orgTier'],
  //       parent: <OrgWhereUniqueInput>this.form.value['parentOrg'],
  //     };
  //   } else if (
  //     this.form.value['parentOrg'] == 'N/A' &&
  //     this.form.value['childOrg'] != 'N/A'
  //   ) {
  //     return {
  //       name: this.form.value['confirmName'],
  //       orgTier: this.form.value['orgTier'],
  //       children: <OrgWhereUniqueInput>this.form.value['childOrg'],
  //     };
  //   }
  //   else{
  //   }
  // }
}
