import { Component, OnInit } from '@angular/core';
import { RequestedAccountsService } from './requested-accounts.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'odst-requested-accounts',
  templateUrl: './requested-accounts.component.html',
  styleUrls: ['./requested-accounts.component.scss'],
})
export class RequestedAccountsComponent implements OnInit {
  constructor(private requestedAccountsService: RequestedAccountsService) {}

  objectKeys = Object.keys;
  dataSource;
  columnData = {
    'First Name': 'firstName',
    'Last Name': 'lastName',
    Grade: 'rank',
    'Requested Permissions': 'role',
  };

  requestViewIsOpen = false;
  displayedAccountRequest;
  displayedRequestData;

  ngOnInit(): void {
    this.requestedAccountsService.getRequestedAccounts().subscribe((data) => {
      this.dataSource = data.data.findManyAccountRequests;
      console.log();
    });
  }

  viewAccountRequest(row) {
    this.displayedAccountRequest = row;
    //this.displayedAccountRequest.date = new Date(formatDate(row['date'], 'shortDate', 'en-US'));
    this.displayedRequestData = {
      'First Lame': row.firstName,
      'Last Name': row.lastName,
      Grade: row.rank,
      'Requested Permissions': row.role,
      'E-mail': row.email,
      Date: formatDate(row['date'], 'fullDate', 'en-US'),
      Organization: row.orgs[0].name,
    };
    this.requestViewIsOpen = true;
    console.log(row);
  }

  //This function preserves the original order of objects when called by the 'keyvalue' function
  keepOrder = (a, b) => {
    return a;
  };
}
