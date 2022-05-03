import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

export interface requestedAccountDetails {
  FirstName: string;
  LastName: string;
  Name: string;
  Grade: string;
  Email: string;
  'Requested Permissions': string;
  Unit: string;
}

@Injectable({
  providedIn: 'root',
})
export class RequestedAccountsService {
  constructor(private apollo: Apollo) {}

  getRequestedAccounts() {
    const requestedAccounts: requestedAccountDetails[] = [
      {
        FirstName: 'Diana',
        LastName: 'Prince',
        Name: 'Diana Prince',
        Grade: 'O-5',
        Email: 'diana.prince@us.af.mil',
        Unit: '552 ACNS',
        'Requested Permissions': 'Commander',
      },
      {
        FirstName: 'Clark',
        LastName: 'Kent',
        Name: 'Clark Kent',
        Grade: 'O-6',
        Email: 'clark.kent@us.af.mil',
        Unit: '552 ACG',
        'Requested Permissions': 'Commander',
      },
      {
        FirstName: 'Bruce',
        LastName: 'Wayne',
        Name: 'Bruce Wayne',
        Grade: 'CTR',
        Email: 'bruce.wayne@ctr.mil',
        Unit: 'N/A',
        'Requested Permissions': 'ADMIN',
      },
    ];
    return requestedAccounts;
  }
}
