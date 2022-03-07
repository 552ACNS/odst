import { Injectable } from '@angular/core';
import { OrgCreateInput } from '@odst/types';
import { Org } from '@prisma/client';
import { gql, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/build/types';

@Injectable({
  providedIn: 'root',
})
export class CreateOrgService {
  constructor() {
    // empty
  }

  queryOrgs(): TypedDocumentNode<any, EmptyObject> {
    const GET_ORGS = gql`
      query {
        findManyOrgs {
          id
          name
          aliases
          orgTier
        }
      }
    `;
    return GET_ORGS;
  }

  mutationCreateOrg(): TypedDocumentNode<Org, OrgCreateInput> {
    const SUBMIT_ORG = gql<Org, OrgCreateInput>`
      mutation createOrg($orgCreateInput: OrgCreateInput!) {
        createOrg(orgCreateInput: $orgCreateInput) {
          id
        }
      }
    `;
    return SUBMIT_ORG;
  }
}
