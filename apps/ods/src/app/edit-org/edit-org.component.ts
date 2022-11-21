import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { EditOrgService } from './edit-org.service';
import {
  CustomValidators,
  MyErrorStateMatcher,
  regExpForOrgNames,
  errorMessagesForOrgNames,
} from '@odst/shared/angular';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatLegacyChipInputEvent as MatChipInputEvent } from '@angular/material/legacy-chips';
import { MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent } from '@angular/material/legacy-autocomplete';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { OrgTier } from '../../types.graphql';
import { first } from 'rxjs';

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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  orgCtrl = new FormControl();
  filteredOrgs: string[];
  selectedChildren: string[] = [];
  childrenOrgs: string[];

  @ViewChild('orgInput') orgInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private editOrgService: EditOrgService
  ) {}
  async ngOnInit(): Promise<void> {
    const temp: string[] = [];
    (await this.editOrgService.getUserOrgsNames()).subscribe(
      async (orgNames) => {
        (await this.editOrgService.getChildren(orgNames[0])).subscribe(
          (children) => {
            children.forEach((child) => {
              temp.push(child);
            });

            temp.push(orgNames[0]);
          }
        );
        this.userOrgs = temp;
      }
    );
  }

  //TODO: make sure it kicks back an error visible to the user if unit name already exists
  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = this.fb.group(
    {
      orgInput: [''],
      childOrg: [''],
      orgToEdit: ['', [Validators.required]],
      orgName: ['', [Validators.pattern(regExpForOrgNames['orgName'])]],
      confirmName: [''],
    },
    { validators: CustomValidators.matchingNames }
  );

  onInputMakeRequired() {
    if (this.form.value['orgName'] !== '') {
      this.form.controls['orgName'].setValidators([Validators.required]);
      this.form.controls['confirmName'].setValidators([Validators.required]);
    } else {
      this.form.controls['confirmName'].clearValidators();
      this.form.controls['orgName'].clearValidators();
    }
  }

  async getChildren(name: string) {
    this.selectedChildren = [];
    (await this.editOrgService.getChildren(name)).subscribe((children) => {
      for (let i = 0; i < children.length; i++) {
        this.selectedChildren.push(children[i]);
      }
    });
  }

  //TODO: figure out if we want to pull orgs of a tier without parents(currently) or all orgs of that tier
  async getOrgTierBelow(orgName: string) {
    (await this.editOrgService.getOrgTier(orgName)).subscribe(async (tier) => {
      (await this.editOrgService.getOrgsByTierBelow(<OrgTier>tier)).subscribe(
        (data) => {
          this.childrenOrgs = data;
        }
      );
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

  generateFilteredOrgs() {
    let temp: string[] = [];
    temp = this.filteredOrgs;
    temp = this.childrenOrgs.filter(
      (org) => !this.selectedChildren?.includes(org)
    );

    const input = this.orgInput?.nativeElement.value.trim().toLowerCase();

    if (input) {
      temp = temp.filter((org) => org.toLowerCase().includes(input));
    }
    this.filteredOrgs = temp;
  }

  childrenConnection(selectedChildren: string[]): { name: string }[] {
    const result: any[] = [];
    for (let i = 0; i < selectedChildren.length; i++) {
      result[i] = { name: selectedChildren[i] };
    }
    return result;
  }

  async submit() {
    this.form.value['confirmName'] = this.form.value['confirmName']
      .trim()
      .toUpperCase();
    let orgName = '';
    (await this.editOrgService.checkOrg(this.form.value['confirmName']))
      .pipe(first())
      .subscribe(async (result) => {
        if (result.data.checkOrg && this.form.value['confirmName'] !== '') {
          this.snackBar.open(
            'Organization name already exists, please choose a different name',
            '',
            {
              duration: 2500,
              panelClass: 'primary-text-contrast',
            }
          );
          return;
        } else {
          if (this.form.value['confirmName'] === '') {
            orgName = this.form.value['orgToEdit'];
          } else {
            orgName = this.form.value['confirmName'];
          }
          (
            await this.editOrgService.updateOrg({
              where: { name: this.form.value.orgToEdit },
              data: {
                name: {
                  set: orgName,
                },
                children: {
                  set: this.childrenConnection(this.selectedChildren),
                },
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
        }
      });
  }
}
