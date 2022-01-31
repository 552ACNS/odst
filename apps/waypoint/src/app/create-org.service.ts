import { Injectable } from '@angular/core';
import { Apollo, gql, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';

@Injectable({
  providedIn: 'root'
})
export class CreateOrgService {
  constructor(private apollo: Apollo) { }

  queryOrg(): TypedDocumentNode<any, EmptyObject> {
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
}
