import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { OrgGQL, PersonGQL } from '@odst/types';
import { Subscription } from 'rxjs';
import { GET_ORGS, GET_PERSONS } from '../graphql/queries';

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

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery({
        query: GET_ORGS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data);
        this.loading = loading;
        this.orgs = data;
      });

    this.querySubscription = this.apollo
      .watchQuery({
        query: GET_PERSONS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.persons = data;
      });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
