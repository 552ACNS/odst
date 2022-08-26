import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { OrgTier } from '../../types.graphql';
import {
  CreateOrgDocument,
  CreateOrgMutation,
  CreateOrgMutationVariables,
  GetOrgNamesDocument,
  GetOrgNamesQuery,
  GetOrgNamesQueryVariables,
  GetOrgsByTierAboveDocument,
  GetOrgsByTierAboveQuery,
  GetOrgsByTierAboveQueryVariables,
  GetOrgsByTierBelowDocument,
  GetOrgsByTierBelowQuery,
  GetOrgsByTierBelowQueryVariables,
} from './create-org.generated';

@Injectable({
  providedIn: 'root',
})
export class CreateOrgService {
  constructor(private apollo: Apollo) {}

  //a query to find all of the orgs available for the selector
  async getOrgNames(): Promise<Observable<string[]>> {
    return this.apollo
      .watchQuery<GetOrgNamesQuery, GetOrgNamesQueryVariables>({
        query: GetOrgNamesDocument,
      })
      .valueChanges.pipe(map((result) => result.data.getOrgNames));
  }

  async getOrgsByTierBelow(orgTier: OrgTier) {
    return this.apollo
      .watchQuery<GetOrgsByTierBelowQuery, GetOrgsByTierBelowQueryVariables>({
        query: GetOrgsByTierBelowDocument,
        variables: {
          orgTier,
        },
      })
      .valueChanges.pipe(map((result) => result.data.getOrgsBelowTier));
  }

  async getOrgsByTierAbove(orgTier: OrgTier) {
    return this.apollo
      .watchQuery<GetOrgsByTierAboveQuery, GetOrgsByTierAboveQueryVariables>({
        query: GetOrgsByTierAboveDocument,
        variables: {
          orgTier,
        },
      })
      .valueChanges.pipe(map((result) => result.data.getOrgsAboveTier));
  }

  async createOrg(
    orgCreateInput: CreateOrgMutationVariables['orgCreateInput']
  ) {
    return this.apollo.mutate<CreateOrgMutation, CreateOrgMutationVariables>({
      mutation: CreateOrgDocument,
      variables: {
        orgCreateInput,
      },
    });
  }
}
