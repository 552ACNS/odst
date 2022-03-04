import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { OrgGQL, PersonGQL } from '@odst/types';
import { Subscription } from 'rxjs';
import { getAccessToken, isLoggedIn } from '@odst/helpers';

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
  loggedInCheck() {
    console.log(isLoggedIn())
    return isLoggedIn();
  }
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
