import { Injectable } from '@angular/core';
import { gql, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';

@Injectable({
  providedIn: 'root'
})
export class CreateOrgService {

  constructor() {}

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

  mutationCreateOrg(): TypedDocumentNode<any, EmptyObject> {
    const SUBMIT_ORG = gql`
    mutation createOrg($orgCreateInput: OrgCreateInput!) {
        createOrg(orgCreateInput: $orgCreateInput) {
          id
        }
      }
    `;
    return SUBMIT_ORG;
  } 
}
