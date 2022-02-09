import { Injectable } from '@angular/core';
import { gql, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';

@Injectable({
  providedIn: 'root',
})
export class CreatePersonService {
  constructor() {
    //empty
  }

  queryOrgs(): TypedDocumentNode<any, EmptyObject> {
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

  mutationCreatePerson(): TypedDocumentNode<any, EmptyObject> {
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
