import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
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
}
