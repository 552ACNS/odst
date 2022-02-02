import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { OrgGQL, PersonGQL } from '@odst/types';
import { Subscription } from 'rxjs';
import { parse } from 'path/posix';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

 const GET_PERSONS = gql`
   query {
     findManyPersons {   
       firstName   
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
  orgs: OrgGQL[] = [{id: "", name: "", aliases: [], orgTier: "WING", parentId: null}];
  persons: PersonGQL[] = [{id: "", dodId: 0, firstName: "", lastName: "", middleInitial: "",
  email: "", hairColor: "BROWN", eyeColor: "BLUE", birthCity: "", birthState: "OK",
  birthCountry: "",  ssn: 0, birthDate: new Date(),
  citizenshipId: "", height: 0, initialTraining: true, 
  NDA: true, grade: 0, orgId: "", spec: "OTHER", role: "ADMIN"}];

  querySubscription: Subscription;  
dataToDisplay : PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

 tableProps = [
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
      header: 'Weight',
    },
    {
      columnDef: 'OrgTier',
      header: 'Symbol',
    },
  ];
    
  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_ORGS
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
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
