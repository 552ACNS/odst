import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { OrgGQL, PersonGQL } from '@odst/types';
import { Subscription } from 'rxjs';
import { getAccessToken } from '@odst/helpers';

const GET_PERSONS = gql`
  query {
    findManyPersons {
      firstName
      lastName
      dodId
      ssn
    }
  }
`;

const GET_ORGS = gql`
  query {
    findManyOrgs {
      id
      name
      aliases
      orgTier
    }
  }
`;
@Component({
    selector: 'odst-table-data',
    templateUrl: './table-data.component.html',
    styleUrls: ['./table-data.component.scss'],
  })
export class TableDataComponent implements OnInit, OnDestroy {
    constructor(private apollo: Apollo) {}
    loading = true;
    orgs: OrgGQL[] = [
      { id: '', name: '', aliases: [], orgTier: 'WING', parentId: null },
    ];
    persons: PersonGQL[] = [
      {
        id: '',
        dodId: 0,
        firstName: '',
        lastName: '',
        middleInitial: '',
        email: '',
        hairColor: 'BROWN',
        eyeColor: 'BLUE',
        birthCity: '',
        birthState: 'OK',
        birthCountry: '',
        ssn: 0,
        birthDate: new Date(),
        citizenshipId: '',
        height: 0,
        initialTraining: true,
        NDA: true,
        grade: 0,
        orgId: '',
        spec: 'OTHER',
        role: 'ADMIN',
      },
    ];
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
      .watchQuery<any>({
        query: GET_ORGS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.orgs = data.findManyOrgs;
      });

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_PERSONS,
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
