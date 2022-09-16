import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { OrgTier } from '../../types.graphql';
import {
  CheckOrgDocument,
  CheckOrgQueryVariables,
  CheckOrgQuery,
  GetChildrenDocument,
  GetChildrenQuery,
  GetChildrenQueryVariables,
  GetOrgTierDocument,
  GetOrgTierQuery,
  GetOrgTierQueryVariables,
  GetTiersBelowKeepParentsDocument,
  GetTiersBelowKeepParentsQuery,
  GetTiersBelowKeepParentsQueryVariables,
  GetUserOrgsNamesDocument,
  GetUserOrgsNamesQuery,
  GetUserOrgsNamesQueryVariables,
  UpdateOrgDocument,
  UpdateOrgMutation,
  UpdateOrgMutationVariables,
} from './edit-org.generated';

@Injectable({
  providedIn: 'root',
})
export class EditOrgService {
  constructor(private apollo: Apollo) {}

  async getUserOrgsNames(): Promise<Observable<string[]>> {
    return this.apollo
      .watchQuery<GetUserOrgsNamesQuery, GetUserOrgsNamesQueryVariables>({
        query: GetUserOrgsNamesDocument,
        errorPolicy: 'all',
      })
      .valueChanges.pipe(map((result) => result.data.getUserOrgsNames));
  }

  async updateOrg(updateOrgMutationVariables: UpdateOrgMutationVariables) {
    return this.apollo.mutate<UpdateOrgMutation, UpdateOrgMutationVariables>({
      mutation: UpdateOrgDocument,
      variables: updateOrgMutationVariables,
      errorPolicy: 'all',
    });
  }

  async getChildren(name: string): Promise<Observable<string[]>> {
    return this.apollo
      .watchQuery<GetChildrenQuery, GetChildrenQueryVariables>({
        query: GetChildrenDocument,
        variables: {
          orgName: name,
        },
        errorPolicy: 'all',
      })
      .valueChanges.pipe(map((result) => result.data.getOrgChildren));
  }

  async getOrgTier(name: string): Promise<Observable<string>> {
    return this.apollo
      .watchQuery<GetOrgTierQuery, GetOrgTierQueryVariables>({
        query: GetOrgTierDocument,
        variables: {
          orgName: name,
        },
        errorPolicy: 'all',
      })
      .valueChanges.pipe(map((result) => result.data.getOrgTier));
  }

  async getOrgsByTierBelow(orgTier: OrgTier) {
    return this.apollo
      .watchQuery<
        GetTiersBelowKeepParentsQuery,
        GetTiersBelowKeepParentsQueryVariables
      >({
        query: GetTiersBelowKeepParentsDocument,
        variables: {
          orgTier,
        },
        errorPolicy: 'all',
      })
      .valueChanges.pipe(
        map((result) => result.data.getOrgsBelowTierWithKeepParents)
      );
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
