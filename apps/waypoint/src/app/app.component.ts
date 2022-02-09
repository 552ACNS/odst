import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { OrgGQL } from '@odst/types';
import { Subscription } from 'rxjs';
import { getAccessToken } from '@odst/helpers';

const GET_ORGS = gql`
  query {
    findManyOrgs {
      id
      name
      aliases
    }
  }
`;

@Component({
  selector: 'odst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private apollo: Apollo) {}
  loading = true;
  orgs: OrgGQL[] = [
    { id: '', name: '', aliases: [], orgTier: 'WING', parentId: null },
  ];

  querySubscription: Subscription;
  orgName = 'Haha';

  ngOnInit() {
    console.log(`accessToken: ${getAccessToken()}`);
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_ORGS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.orgs = data.findManyOrgs;
      });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
