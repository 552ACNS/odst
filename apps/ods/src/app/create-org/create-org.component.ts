import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
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
  orgTiers: string[];
  submitSuccess = false;
  submitError: boolean;
  matcher = new MyErrorStateMatcher();
  errors = errorMessagesForOrgNames;
  parentOrgs: string[];
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

  async ngOnInit(): Promise<void> {
    (await this.createOrgService.getTierByUser()).subscribe((tier) => {
      this.orgTiers = tier;
    });
  }

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
    (await this.createOrgService.getOrgsByTierAbove(tier)).subscribe((data) => {
      const result: any[] = [];
      for (let i = 0; i < data.length; i++) {
        result[i] = data[i];
      }
      result.push('N/A');
      this.parentOrgs = result;
    });
  }

  async getOrgTierBelow(tier: OrgTier) {
    (await this.createOrgService.getOrgsByTierBelow(tier)).subscribe((data) => {
      this.childrenOrgs = data;
    });
    this.selectedChildren = [];
  }

  checkForChildren() {
    if (this.childrenOrgs.length == 0) {
      this.snackBar.open('No children available', '', {
        duration: 2500,
        panelClass: 'primary-text-contrast',
      });
    }
  }

  checkValidChild(str: string) {
    if (!this.filteredOrgs.includes(str)) {
      this.snackBar.open('Organization not available', '', {
        duration: 2500,
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
    this.form.value['orgName'] = this.form.value['orgName']
      .trim()
      .toUpperCase();
    this.form.value['confirmName'] = this.form.value['confirmName']
      .trim()
      .toUpperCase();
    this.form.value['parentOrg'] = this.form.value['parentOrg']
      .trim()
      .toUpperCase();

    (await this.createOrgService.checkOrg(this.form.value['orgName']))
      .pipe(first())
      .subscribe(async (result) => {
        if (!result.data.checkOrg) {
          let parentConnection: any = {
            connect: { name: this.form.value['parentOrg'] },
          };
          if (
            this.form.value['parentOrg'] == '' ||
            this.form.value['parentOrg'] == 'N/A'
          ) {
            parentConnection = undefined;
          }
          (
            await this.createOrgService.createOrg({
              name: this.form.value['confirmName'],
              orgTier: this.form.value['orgTier'],
              parent: parentConnection,
              children: {
                connect: this.childrenConnection(this.selectedChildren),
              },
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
          this.snackBar.open('Organization already exists', '', {
            duration: 2500,
            panelClass: 'primary-text-contrast',
          });
        }
      });
  }
}
