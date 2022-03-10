import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  OrgGql,
  PersonGql,
  FindManyOrgsDocument,
  FindManyOrgsQuery,
  FindManyOrgsQueryVariables,
  FindManyPersonsQuery,
  FindManyPersonsDocument,
  FindManyPersonsQueryVariables,
} from '../operations-types';
import { isLoggedIn } from '@odst/helpers';

@Component({
  selector: 'odst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private apollo: Apollo) {}
  loading = true;
  orgs: Partial<OrgGql>[];
  persons: Partial<PersonGql>[];
  querySubscription: Subscription;
  tablePropsOrg = [
    {
      columnDef: 'id',
      header: '#',
    },
    {
      columnDef: 'name',
      header: 'Name',
    },
    {
      columnDef: 'aliases',
      header: 'Aliases',
    },
    {
      columnDef: 'OrgTier',
      header: 'OrgTier',
    },
  ];
  tablePropsPerson = [
    {
      columnDef: 'firstName',
      header: 'First Name',
    },
    {
      columnDef: 'lastName',
      header: 'Last Name',
    },
    {
      columnDef: 'dodId',
      header: 'DOD ID',
    },
    {
      columnDef: 'ssn',
      header: 'SSN',
    },
  ];
  loggedInCheck() {
    return isLoggedIn();
  }
  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<FindManyOrgsQuery, FindManyOrgsQueryVariables>({
        query: FindManyOrgsDocument,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data);
        this.loading = loading;
        this.orgs = data.findManyOrgs;
      });

    this.querySubscription = this.apollo
      .watchQuery<FindManyPersonsQuery, FindManyPersonsQueryVariables>({
        query: FindManyPersonsDocument,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.persons = data.findManyPersons;
      });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
