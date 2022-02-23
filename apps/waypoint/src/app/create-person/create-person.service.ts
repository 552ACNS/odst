import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreatePersonService {
  constructor() {
    //empty
  }

  queryOrgs() {
    const GET_ORGS = gql`
      query {
        findManyOrgs {
          id
          name
          aliases
        }
      }
    `;
    return GET_ORGS;
  }

  mutationCreatePerson() {
    const SUBMIT_PERSON = gql`
      mutation createPerson($personCreateInput: PersonCreateInput!) {
        createPerson(personCreateInput: $personCreateInput) {
          id
        }
      }
    `;
    return SUBMIT_PERSON;
  }
}
