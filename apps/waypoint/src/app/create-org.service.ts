import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Org, OrgTier } from '@prisma/client';
import { OrgGQL } from '@odst/types';

@Injectable({
  providedIn: 'root'
})
export class CreateOrgService {

  querySubscription: Subscription;
  loading = true;
  // orgs: Partial<Org>[] = [
  //   { id: '', name: '', aliases: [], orgTier: 'WING', parentId: null },
  // ];

  constructor(private apollo: Apollo) { }

  queryOrg(orgs: Partial<Org>[]): Partial<Org>[] {
    
    const GET_ORGS = gql`
      query {
        findManyOrgs {
          id
          name
          aliases
        }
      }
    `;
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_ORGS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        orgs = data.findManyOrgs;
      });
      return orgs;
  }
}
