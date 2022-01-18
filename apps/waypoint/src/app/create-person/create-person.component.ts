/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Spec } from '@prisma/client';
import { HairColor } from '@prisma/client';
import { EyeColor } from '@prisma/client';
import { BirthState } from '@prisma/client';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { useMutation } from '@apollo/client';
import { PersonGQL } from '@odst/types';
import { PersonCreateInput } from '@odst/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'odst-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss'],
})
export class CreatePersonComponent implements OnInit {
  specs: string[] = Object.values(Spec);
  hairColors: string[] = Object.values(HairColor);
  eyeColors: string[] = Object.values(EyeColor);
  birthStates: string[] = Object.values(BirthState);

  personForm = this.fb.group({
    personFirstName: ['', Validators.required],
    personLastName: ['', Validators.required],
    personMiddleInitial: ['', Validators.maxLength],
    personEmail: ['', Validators.email],
    personDoDIDNumber: [
      '',
      [Validators.required, Validators.pattern('^[0-9]*$')],
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
    personHeight: ['', Validators.required],
    personBirthDate: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private apollo: Apollo) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    console.log('$testing');
  }

  PersonSubmit(): void {
    const SUBMIT_PERSON = gql`
    mutation PersonCreateInput {
      PersonCreateInput(
        firstName: $firstName,
        lastName: $lastName,
        middleInitial: $middleInitial,
        ssn: $ssn,
        dodId: $dodId,
        birthDate: $birthDate,
        birthCity: $birthCity,
        birthCountry: $birthCountry,
        citizenshipId: $citizenshipId,
        initialTraining: $initialTraining,
        NDA: $NDA,
        grade: $grade,
        eyeColor: $eyeColor,
        hairColor: $hairColor,
        birthState: $birthState,
        role: $role,
        spec: $spec,
        height: $height
      )
      {
        id
      }
    }
    `;
    console.log(this.personForm.get(['personFirstName']));
    this.apollo.mutate({
      mutation: SUBMIT_PERSON,
      variables: {
        // firstName: this.personForm.value["personFirstName"],
        // lastName: this.personForm.value["personLastName"],
        // middleInitial: this.personForm.value["personMiddleInitial"],
        // ssn: this.personForm.value["personSSN"],
        // dodID: this.personForm.value["personDoDIDNumber"],
        // birthDate: this.personForm.value["personBirthDate"],
        // birthCity: this.personForm.value["personBirthCity"],
        // birthCountry: this.personForm.value["personBirthCountry"],
        // citizenshipId: this.personForm.value["personFirstName"],
        // initialTraining: this.personForm.value["personFirstName"],
        // NDA: this.personForm.value["personFirstName"],
        // grade: this.personForm.value["personFirstName"],
        // eyeColor: this.personForm.value["personFirstName"],
        // haircolor: this.personForm.value["personFirstName"],
        // birthState: this.personForm.value["personFirstName"],
        // role: this.personForm.value["personFirstName"],
        // spec: this.personForm.value["personFirstName"],
        // height: this.personForm.value["personFirstName"]
        firstName: 'Barry',
        lastName: 'Benson',
        middleInitial: 'B',
        ssn: 420692022,
        dodID: 1234567890,
        birthDate: '02/11/2007',
        birthCity: 'New York City',
        birthCountry: 'US',
        citizenshipId: 'Yes',
        initialTraining: true,
        NDA: false,
        grade: 9,
        eyeColor: 'BROWN',
        haircolor: 'BROWN',
        birthState: 'NY',
        role: 'ADMIN',
        spec: 'OFFICER',
        height: 69,
      }
    });
  }
}
