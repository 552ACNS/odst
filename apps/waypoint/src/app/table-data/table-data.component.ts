import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  FindManyOrgsDocument,
  FindManyOrgsQuery,
  FindManyOrgsQueryVariables,
  FindManyPersonsDocument,
  FindManyPersonsQuery,
  FindManyPersonsQueryVariables,
  Org,
  PersonGql,
} from '../../graphql-generated';

@Component({
  selector: 'odst-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit, OnDestroy {
  constructor(private apollo: Apollo) {}
  loading = true;
  orgs: Partial<Org>[];
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

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<FindManyOrgsQuery, FindManyOrgsQueryVariables>({
        query: FindManyOrgsDocument,
      })
      .valueChanges.subscribe(({ data, loading }) => {
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
