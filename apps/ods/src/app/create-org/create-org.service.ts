import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  GetOrgNamesDocument,
  GetOrgNamesQuery,
  GetOrgNamesQueryVariables,
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
}
