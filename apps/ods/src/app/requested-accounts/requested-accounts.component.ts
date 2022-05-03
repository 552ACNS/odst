import { Component, OnInit } from '@angular/core';
import { RequestedAccountsService } from './requested-accounts.service';
import { AccountRequestGQL } from '@odst/types/ods';

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
    Name: 'firstName',
    Grade: 'rank',
    'Requested Permissions': 'role',
  };
  requestViewIsOpen = false;
  displayedAccountRequest: AccountRequestGQL;

  ngOnInit(): void {
    this.requestedAccountsService.getRequestedAccounts().subscribe((data) => {
      this.dataSource = data.data.findManyAccountRequests;
      console.log();
    });
  }

  viewAccountRequest(row: AccountRequestGQL) {
    this.displayedAccountRequest = row;
    this.requestViewIsOpen = true;
    console.log(this.displayedAccountRequest);
  }
}
