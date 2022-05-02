import { Component, OnInit } from '@angular/core';

export interface requestedAccountDetails {
  FirstName: string;
  LastName: string;
  Grade: string;
  email: string;
  RequestedPermissions: string;
  Unit: string;
}

const requestedAccounts: requestedAccountDetails[] = [
  {
    FirstName: 'Diana',
    LastName: 'Prince',
    Grade: 'O-5',
    email: 'diana.prince@us.af.mil',
    Unit: '552 ACNS',
    RequestedPermissions: 'Commander',
  },
  {
    FirstName: 'Clark',
    LastName: 'Kent',
    Grade: 'O-6',
    email: 'clark.kent@us.af.mil',
    Unit: '552 ACG',
    RequestedPermissions: 'Commander',
  },
  {
    FirstName: 'Bruce',
    LastName: 'Wayne',
    Grade: 'CTR',
    email: 'bruce.wayne@ctr.mil',
    Unit: 'N/A',
    RequestedPermissions: 'ADMIN',
  },
];

@Component({
  selector: 'odst-requested-accounts',
  templateUrl: './requested-accounts.component.html',
  styleUrls: ['./requested-accounts.component.scss'],
})
export class RequestedAccountsComponent implements OnInit {
  constructor() {}

  dataSource = requestedAccounts;
  displayedColumns: string[] = ['Name', 'Grade', 'requested Permissions'];

  ngOnInit(): void {}
}
