import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrgTier } from '../../types.graphql';
import { CreateOrgService } from './create-org.service';
import {
  CustomValidators,
  MyErrorStateMatcher,
  regExpForOrgNames,
  errorMessagesForOrgNames,
} from '@odst/shared/angular';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'odst-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss'],
})
export class CreateOrgComponent implements OnInit {
  //TODO: fix error shown when org name already exists
  groupTiers: string[];
  submitSuccess = false;
  submitError: boolean;
  matcher = new MyErrorStateMatcher();
  errors = errorMessagesForOrgNames;
  parentOrgs: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  orgCtrl = new FormControl();
  filteredOrgs: string[];
  selectedChildren: string[] = [];
  childrenOrgs: string[];

  @ViewChild('orgInput') orgInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
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
      orgInput: [''],
    },
    { validators: CustomValidators.matchingNames }
  );

  async getOrgTierAbove(tier: OrgTier) {
    this.parentOrgs = await this.createOrgService.getOrgsByTierAbove(tier);
  }

  async getOrgTierBelow(tier: OrgTier) {
    (await this.createOrgService.getOrgsByTierBelow(tier)).subscribe((data) => {
      this.childrenOrgs = data;
    });
    this.selectedChildren = [];
  }

  checkValidChild(str: string) {
    if (!this.filteredOrgs.includes(str)) {
      this.snackBar.open('Organization not available', '', {
        duration: 1500,
        panelClass: 'primary-text-contrast',
      });
      return false;
    } else return true;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    event.chipInput?.clear();

    if (this.checkValidChild(value)) {
      this.selectedChildren.push(value);

      // Clear the input value

      this.orgCtrl.setValue(null);
      this.generateFilteredOrgs();
    }
  }

  remove(orgsRemoved: string): void {
    const index = this.selectedChildren.indexOf(orgsRemoved);

    if (index >= 0) {
      this.selectedChildren.splice(index, 1);
    }
    this.generateFilteredOrgs();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedChildren.push(event.option.viewValue);
    this.orgInput.nativeElement.value = '';
    this.orgCtrl.setValue(null);
    this.generateFilteredOrgs();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.childrenOrgs.filter((org) =>
      org.toLowerCase().includes(filterValue)
    );
  }

  generateFilteredOrgs() {
    this.filteredOrgs = this.childrenOrgs.filter(
      (org) => !this.selectedChildren?.includes(org)
    );

    const input = this.orgInput?.nativeElement.value.trim().toLowerCase();

    if (input) {
      this.filteredOrgs = this.filteredOrgs.filter((org) =>
        org.toLowerCase().includes(input)
      );
    }
  }

  childrenConnection(selectedChildren: string[]): { name: string }[] {
    const result: any[] = [];
    for (let i = 0; i < selectedChildren.length; i++) {
      result[i] = { name: selectedChildren[i] };
    }
    return result;
  }

  async submit() {
    //TODO: add logic for N/A children and parent
    //TODO: add tooltip for regex.
    if (
      this.form.value['parentOrg'] == '' ||
      this.form.value['parentOrg'] == 'N/A'
    ) {
      (
        await this.createOrgService.createOrg({
          name: this.form.value['confirmName'].toUpperCase().trim(),
          orgTier: this.form.value['orgTier'],
          children: { connect: this.childrenConnection(this.selectedChildren) },
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
    } else {
      (
        await this.createOrgService.createOrg({
          name: this.form.value['confirmName'].toUpperCase().trim(),
          orgTier: this.form.value['orgTier'],
          parent: { connect: { name: this.form.value['parentOrg'] } },
          children: { connect: this.childrenConnection(this.selectedChildren) },
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
  }
}
