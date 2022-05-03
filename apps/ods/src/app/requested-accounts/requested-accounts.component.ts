import { Component, OnInit } from '@angular/core';
import {
  RequestedAccountsService,
  requestedAccountDetails,
} from './requested-accounts.service';

@Component({
  selector: 'odst-requested-accounts',
  templateUrl: './requested-accounts.component.html',
  styleUrls: ['./requested-accounts.component.scss'],
})
export class RequestedAccountsComponent implements OnInit {
  constructor(private requestedAccountsService: RequestedAccountsService) {}

  dataSource: requestedAccountDetails[] =
    this.requestedAccountsService.getRequestedAccounts();
  displayedColumns: string[] = ['Name', 'Grade', 'Requested Permissions'];

  ngOnInit(): void {}
}
