import { Component, OnInit } from '@angular/core';
import { RequestedAccountsService } from './requested-accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'odst-requested-accounts',
  templateUrl: './requested-accounts.component.html',
  styleUrls: ['./requested-accounts.component.scss'],
})
export class RequestedAccountsComponent implements OnInit {
  constructor(
    private requestedAccountsService: RequestedAccountsService,
    private snak: MatSnackBar
  ) {}

  objectKeys = Object.keys;
  dataSource;
  columnData = {
    'First Name': 'firstName',
    'Last Name': 'lastName',
    Grade: 'grade',
    'Requested Permissions': 'role',
  };
  hasNoData: boolean;

  submitSuccess: boolean;
  requestViewIsOpen = false;
  displayedAccountRequest;
  displayedRequestData;

  ngOnInit(): void {
    this.requestedAccountsService.getRequestedAccounts().subscribe((data) => {
      this.dataSource = data.data.findManyAccountRequests;
      this.hasNoData = this.dataSource.length === 0;
    });
  }

  viewAccountRequest(row) {
    this.displayedAccountRequest = row;
    //this.displayedAccountRequest.date = new Date(formatDate(row['date'], 'shortDate', 'en-US'));
    this.displayedRequestData = {
      'First Name': row.firstName,
      'Last Name': row.lastName,
      Grade: row.grade,
      'Requested Permissions': row.role,
      'E-mail': row.email,
      Organization: row.orgs[0].name,
    };
    this.requestViewIsOpen = true;
    console.log(row);
  }

  acceptRequest() {
    this.requestedAccountsService
      .acceptAccountRequest(this.displayedAccountRequest['id'])
      .subscribe(({ errors, data }) => {
        this.submitSuccess = !errors && !!data;
        if (this.submitSuccess) {
          this.removeRow();
          this.snak.open('Account successfully approved', '', {
            duration: 5000,
          });
        } else {
          this.snak.open('Oops! Something went wrong!');
        }
      });
    // A. We don't use alerts in the program. B. This will always give this alert even when it fails.
    // alert('Account successfully created.');
  }

  removeRow(): void {
    this.dataSource = this.dataSource.filter((item) => item.enabled === false);
    this.requestViewIsOpen = false;
    this.displayedAccountRequest = {};
    this.displayedRequestData = {};
    this.hasNoData = this.dataSource.length === 0;
  }

  //This function preserves the original order of objects when called by the 'keyvalue' function
  keepOrder = (a) => {
    return a;
  };
}
