/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { CreatePersonService } from './create-person.service';
import {
  getFirstName,
  getLastName,
  getMiddleInitial,
  getDoDID,
  getSSN,
  getDoB,
} from '@odst/helpers';
import {
  CreatePersonDocument,
  CreatePersonMutation,
  CreatePersonMutationVariables,
  FindManyOrgsDocument,
  FindManyOrgsQuery,
  FindManyOrgsQueryVariables,
  OrgGql,
  Role,
  EyeColor,
  BirthState,
  HairColor,
  Spec,
} from '../../graphql-generated';

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
  orgs: Partial<OrgGql>[];
  personGrades: number[];
  querySubscription: Subscription;
  loading = true;
  submitSuccess = false;

  nameForm = this.fb.group({
    personCACScan: [''],
    personFirstName: ['', Validators.required],
    personLastName: ['', Validators.required],
    //TODO [ODST-137] no space, space bad, ajax get rid of spaces or whatever good catch actually
    personMiddleInitial: ['', Validators.maxLength],
    personEmail: ['', Validators.email],
    personDoDIDNumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{9,10}'),
        Validators.maxLength,
      ],
    ],
    personSSN: [
      '',
      [
        Validators.required,
        Validators.pattern('(^\\d{3}-?\\d{2}-?\\d{4}$|^XXX-XX-XXXX$)'),
        Validators.maxLength,
      ],
    ],
  });

  birthForm = this.fb.group({
    personBirthCountry: ['', Validators.required],
    personBirthCity: ['', Validators.required],
    personBirthDate: ['', Validators.required],
    personBirthState: ['', Validators.required],
  });

  identityForm = this.fb.group({
    personHeight: [
      '',
      [Validators.required, Validators.pattern('^[1-9]?[0-9]{1}$|^100')],
    ],

    personHairColor: ['', Validators.required],
    personEyeColor: ['', Validators.required],
    personSpec: ['', Validators.required],
    personGrade: ['', Validators.required],
    personOrg: ['', Validators.required],
    personInitialTraining: ['', Validators.nullValidator],
    personNDA: ['', Validators.nullValidator],
    personInitTrngCheck: ['', Validators.nullValidator],
  });

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private personService: CreatePersonService
  ) {}

  async ngOnInit(): Promise<void> {
    this.querySubscription = this.apollo
      .watchQuery<FindManyOrgsQuery, FindManyOrgsQueryVariables>({
        query: FindManyOrgsDocument,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.orgs = data.findManyOrgs;
      });
  }

  personInitTrngCheck(): boolean {
    if (this.identityForm.get(['personInitialTraining'])?.value == true) {
      return true;
    } else {
      return false;
    }
  }

  personNDAcheck(): boolean {
    if (this.identityForm.get(['personNDA'])?.value == true) {
      return true;
    } else {
      return false;
    }
  }
  //TODO: Fix Spec and Grade interaction and fix Grade values
  counter(n: number): number[] {
    return [...Array(n).keys()];
  }

  submitCAC() {
    //applies to both CAC inputs
    const scannedCard: string = this.nameForm.value['personCACScan'];
    const firstName = getFirstName(scannedCard);
    const lastName = getLastName(scannedCard);
    const middleInitial = getMiddleInitial(scannedCard);
    const assignedDoDID = getDoDID(scannedCard);
    const rawDoB = getDoB(scannedCard);
    const rawSSN = getSSN(scannedCard);

    //code CAC scanner input here^
    this.nameForm.patchValue({
      personFirstName: firstName,
      personLastName: lastName,
      personMiddleInitial: middleInitial,
      personDoDIDNumber: assignedDoDID,
      personSSN: rawSSN,
      personCACScan: '',
    });
    this.birthForm.patchValue({
      personBirthDate: rawDoB,
    });
  }

  resetPerson(): void {
    this.submitSuccess = false;
  }

  personSubmit(): void {
    this.apollo
      .mutate<CreatePersonMutation, CreatePersonMutationVariables>({
        mutation: CreatePersonDocument,
        variables: {
          personCreateInput: {
            firstName: this.nameForm.value['personFirstName'],
            lastName: this.nameForm.value['personLastName'],
            middleInitial: this.nameForm.value['personMiddleInitial'],
            email: this.nameForm.value['personEmail'],
            ssn: parseFloat(this.nameForm.value['personSSN']),
            dodId: parseFloat(this.nameForm.value['personDoDIDNumber']),
            birthDate: this.birthForm.value['personBirthDate'],
            birthCity: this.birthForm.value['personBirthCity'],
            birthCountry: this.birthForm.value['personBirthCountry'],
            birthState: this.birthForm.get(['personBirthState'])?.value,
            citizenshipId: 'Yes',
            initialTraining: this.personInitTrngCheck(),
            NDA: this.personNDAcheck(),
            grade: parseFloat(this.identityForm.get(['personGrade'])?.value),
            eyeColor: this.identityForm.get(['personEyeColor'])?.value,
            hairColor: this.identityForm.get(['personHairColor'])?.value,
            role: Role.None,
            spec: this.identityForm.get(['personSpec'])?.value,
            height: parseFloat(this.identityForm.value['personHeight']),
            org: {
              connect: {
                id: this.identityForm.get(['personOrg'])?.value,
              },
            },
          },
        },
      })
      .subscribe(
        //TODO deprecated
        () => {
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
