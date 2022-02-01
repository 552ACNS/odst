/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HairColor, Org, Spec } from '@prisma/client';
import { EyeColor } from '@prisma/client';
import { BirthState } from '@prisma/client';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { CreatePersonService } from './create-person.service';

@Component({
  selector: 'odst-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss'],
})
export class CreatePersonComponent implements OnInit, OnDestroy {
  specs: string[] = Object.values(Spec);
  hairColors: string[] = Object.values(HairColor);
  eyeColors: string[] = Object.values(EyeColor);
  birthStates: string[] = Object.values(BirthState);
  orgs = [
    { id: '', name: '', aliases: [], orgTier: 'WING', parentId: null },
  ];
  personGrades: number[];
  querySubscription: Subscription;
  loading = true;
  submitSuccess = false;

  personForm = this.fb.group({
    personCACScan: [''],
    personFirstName: ['', Validators.required],
    personLastName: ['', Validators.required],
    personMiddleInitial: ['', Validators.maxLength],
    personEmail: ['', Validators.email],
    personDoDIDNumber: [
      '',
      [Validators.required, Validators.pattern('^[0-9]{9,10}'), Validators.maxLength],
    ],
    personSSN: [
      '',
      [
        Validators.required,
        Validators.pattern('(^\\d{3}-?\\d{2}-?\\d{4}$|^XXX-XX-XXXX$)'),
        Validators.maxLength,
      ],
    ],
    personBirthCountry: ['', Validators.required],
    personBirthCity: ['', Validators.required],
    personHeight: ['', 
    [Validators.required, Validators.pattern('^[1-9]?[0-9]{1}$|^100')]
  ],
    personBirthDate: ['', Validators.required],
    personBirthState: ['', Validators.required],
    personHairColor: ['', Validators.required],
    personEyeColor: ['', Validators.required],
    personSpec: ['', Validators.required],
    personGrade: ['', Validators.required],
    personOrg: ['', Validators.required],
    personInitialTraining: ['', Validators.nullValidator],
    personNDA: ['', Validators.nullValidator],
    personInitTrngCheck: ['', Validators.nullValidator],
  });

  constructor(private fb: FormBuilder, private apollo: Apollo, private personService: CreatePersonService) {}

  async ngOnInit(): Promise<void> {
    const GET_ORGS = this.personService.queryOrgs();
    this.querySubscription = this.apollo
    //TODO: make query strongly typed instead of any
    .watchQuery<any>({
      query: GET_ORGS,
    })
    .valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.orgs = data.findManyOrgs;
    });
  }

  personInitTrngCheck(): boolean {
    if (this.personForm.get(['personInitialTraining'])?.value == true) {
      return true;
    } else {
      return false;
    }
  }

  personNDAcheck(): boolean {
    if (this.personForm.get(['personNDA'])?.value == true) {
      return true;
    } else {
      return false;
    }
  }
  counter(n: number): number[] {
    return [...Array(n).keys()];
  }

  submitCAC() {
    // ONLY APPLIES FOR M CACs
    const scannedCard: string = this.personForm.value['personCACScan'];
    const firstName = scannedCard.substring(16, 37).trim()
    const lastName = scannedCard.substring(37, 63).trim();

    this.personForm.patchValue({
      personFirstName: firstName,
      personLastName: lastName,
      personCACScan: ''
    });
  }

  personSubmit(): void {
    const SUBMIT_PERSON = this.personService.mutationCreatePerson();
    this.apollo
      .mutate({
        mutation: SUBMIT_PERSON,
        variables: {
          personCreateInput: {
            firstName: this.personForm.value['personFirstName'],
            lastName: this.personForm.value['personLastName'],
            middleInitial: this.personForm.value['personMiddleInitial'],
            email: this.personForm.value['personEmail'],
            ssn: parseFloat(this.personForm.value['personSSN']),
            dodId: parseFloat(this.personForm.value['personDoDIDNumber']),
            birthDate: this.personForm.value['personBirthDate'],
            birthCity: this.personForm.value['personBirthCity'],
            birthCountry: this.personForm.value['personBirthCountry'],
            citizenshipId: 'Yes',
            initialTraining: this.personInitTrngCheck(),
            NDA: this.personNDAcheck(),
            grade: parseFloat(this.personForm.get(['personGrade'])?.value),
            eyeColor: this.personForm.get(['personEyeColor'])?.value,
            hairColor: this.personForm.get(['personHairColor'])?.value,
            birthState: this.personForm.get(['personBirthState'])?.value,
            role: 'NONE',
            spec: this.personForm.get(['personSpec'])?.value,
            height: parseFloat(this.personForm.value['personHeight']),
            org: {
              connect: {
                id: this.personForm.get(['personOrg'])?.value,
              },
            },
          },
        },
      })
      .subscribe(
        ({ data }) => {
          alert(data);
          this.submitSuccess = true;
        },
        (error) => {
          alert('there was an error sending the query: /n' + error);
          this.submitSuccess = false;
        }
      );
  }
  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
