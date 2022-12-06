import { Component, OnInit } from '@angular/core';
import { RequestedAccountsService } from './requested-accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';

@Component({
  selector: 'odst-requested-accounts',
  templateUrl: './requested-accounts.component.html',
  styleUrls: ['./requested-accounts.component.scss'],
})
export class RequestedAccountsComponent implements OnInit {
  comments = [];
  userId = '1';
  constructor(
    private requestedAccountsService: RequestedAccountsService,
    private snackBar: MatSnackBar
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

  requestViewIsOpen = false;
  displayedAccountRequest;
  displayedRequestData;

  totalCount: number;

  ngOnInit(): void {
    this.requestedAccountsService
      .getRequestedAccounts()
      .pipe(first())
      .subscribe((data) => {
        if (!data.errors && !!data.data) {
          this.dataSource = data.data.findManyAccountRequests;
          this.hasNoData = this.dataSource.length === 0;
          this.totalCount = this.dataSource.length;
        } else {
          this.hasNoData = true;
          this.snackBar.open(
            'There was an error getting the requested accounts on our end. Please try again later.'
          );
        }
      });
  }

  viewAccountRequest(row) {
    this.displayedAccountRequest = row;
    this.displayedRequestData = {
      'First Name': row.firstName,
      'Last Name': row.lastName,
      Grade: row.grade,
      'Requested Permissions': row.role,
      'E-mail': row.email,
      Organization: row.orgs[0].name,
    };
    this.requestViewIsOpen = true;
  }

  acceptRequest() {
    this.requestedAccountsService
      .acceptAccountRequest(this.displayedAccountRequest['id'])
      .subscribe(({ data, errors }) => {
        if (!errors && !!data) {
          this.removeRow();
          this.snackBar.open('Account successfully accepted!', 'Okay', {
            duration: 5000,
          });
        } else {
          this.snackBar.open(
            'There was an error accepting this request on our end. Please try again later.',
            'Okay'
          );
        }
      });
  }

  removeRow(): void {
    this.dataSource = this.dataSource.filter(
      (item) => item !== this.displayedAccountRequest
    );
    this.requestViewIsOpen = false;
    this.displayedAccountRequest = {};
    this.displayedRequestData = {};
    this.hasNoData = this.dataSource.length === 0;
  }

  //This function preserves the original order of objects when called by the 'keyvalue' function
  keepOrder = (a) => {
    return a;
  };

  submitComment(comment) {
    console.log('reeee');
  }
}
