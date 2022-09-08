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

// import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
// import {MatChipInputEvent} from '@angular/material/chips';

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
  ) {
    // this.filteredOrgs = this.orgCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((org: string | null) =>
    //     org ? this._filter(org) : this.childrenOrgs?.slice()
    //   )
    // );
  }

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
