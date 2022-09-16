import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { OrgTier } from '../../types.graphql';
import {
  CheckOrgDocument,
  CheckOrgQuery,
  CheckOrgQueryVariables,
  CreateOrgDocument,
  CreateOrgMutation,
  CreateOrgMutationVariables,
  GetOrgsByTierAboveDocument,
  GetOrgsByTierAboveQuery,
  GetOrgsByTierAboveQueryVariables,
  GetOrgsByTierBelowDocument,
  GetOrgsByTierBelowQuery,
  GetOrgsByTierBelowQueryVariables,
  GetTiersByUserDocument,
  GetTiersByUserQuery,
  GetTiersByUserQueryVariables,
} from './create-org.generated';

@Injectable({
  providedIn: 'root',
})
export class CreateOrgService {
  constructor(private apollo: Apollo) {}

  //a query to find all of the orgs available for the selector
  async getTierByUser(): Promise<Observable<string[]>> {
    return this.apollo
      .watchQuery<GetTiersByUserQuery, GetTiersByUserQueryVariables>({
        query: GetTiersByUserDocument,
        errorPolicy: 'all',
      })
      .valueChanges.pipe(map((result) => result.data.getTiersByUser));
  }

  async getOrgsByTierBelow(orgTier: OrgTier) {
    return this.apollo
      .watchQuery<GetOrgsByTierBelowQuery, GetOrgsByTierBelowQueryVariables>({
        query: GetOrgsByTierBelowDocument,
        variables: {
          orgTier,
        },
        errorPolicy: 'all',
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
        errorPolicy: 'all',
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
      errorPolicy: 'all',
    });
  }

  async checkOrg(orgName: string) {
    return this.apollo.watchQuery<CheckOrgQuery, CheckOrgQueryVariables>({
      query: CheckOrgDocument,
      variables: {
        orgName,
      },
      errorPolicy: 'all',
    }).valueChanges;
  }
}
