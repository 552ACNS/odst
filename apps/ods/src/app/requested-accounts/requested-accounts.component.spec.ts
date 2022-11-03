import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RequestedAccountsComponent } from './requested-accounts.component';
import { RequestedAccountsService } from './requested-accounts.service';
import { RequestedAccountsModule } from './requested-accounts.module';

import { of } from 'rxjs';

describe('RequestedAccountsComponent', () => {
  let component: RequestedAccountsComponent;
  let fixture: ComponentFixture<RequestedAccountsComponent>;

  const mockAccountRequest = [
    {
      email: 'sussus.amogus.2@pain.mil',
      firstName: 'Sussus',
      grade: 'O-9',
      id: 'Test ID',
      lastName: 'Amogus',
      orgs: ['Monsters inc'],
      role: 'CC',
      status: 'REQUESTED',
    } /*
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠈⢻⣿⣿⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣸⣿⡏⠀⠀⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠁⠀⠀⢰⣿⣿⣯⠁⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⡄⠀
⠀⠀⣀⣤⣴⣶⣶⣿⡟⠀⠀⠀⢸⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⠀
⠀⢰⣿⡟⠋⠉⣹⣿⡇⠀⠀⠀⠘⣿⣿⣿⣿⣷⣦⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⠀
⠀⢸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀
⠀⣸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠉⠻⠿⣿⣿⣿⣿⡿⠿⠿⠛⢻⣿⡇⠀⠀
⠀⣿⣿⠁⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀
⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀
⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀
⠀⢿⣿⡆⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀
⠀⠸⣿⣧⡀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀
⠀⠀⠛⢿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⣰⣿⣿⣷⣶⣶⣶⣶⠶⠀⢠⣿⣿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣽⣿⡏⠁⠀⠀⢸⣿⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⢹⣿⡆⠀⠀⠀⣸⣿⠇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢿⣿⣦⣄⣀⣠⣴⣿⣿⠁⠀⠈⠻⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
*/,
    {
      email: 'higa.drip.1@pain.mil',
      firstName: 'Higa',
      grade: 'O-10',
      id: 'Test ID',
      lastName: 'drip',
      orgs: ['Monsters inc'],
      role: 'CC',
      status: 'REQUESTED',
    },
  ];

  const mockRequestedAccountService = {
    getRequestedAccounts: jest
      .fn()
      .mockReturnValue(
        of({ data: { findManyAccountRequests: mockAccountRequest } })
      ),
    acceptAccountRequest: jest.fn().mockReturnValue(of({ data: true })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestedAccountsComponent],
      providers: [
        {
          provide: RequestedAccountsService,
          useValue: mockRequestedAccountService,
        },
      ],
      imports: [
        RouterTestingModule,
        CommonModule,
        ReactiveFormsModule,
        ApolloTestingModule,
        MatTableModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatSnackBarModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        RequestedAccountsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service file because the user navigated to the page', fakeAsync(() => {
    component.ngOnInit();
    tick();

    const expected = mockAccountRequest;
    const actual = component.dataSource;

    expect(actual).toEqual(expected);
  }));

  it('should send a confirmation of account request to the backend because the user pressed the accept button', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.viewAccountRequest(mockAccountRequest[1]);
    component.acceptRequest();
    tick();
    const expected = [mockAccountRequest[0]];
    const actual = component.dataSource;

    expect(actual).toEqual(expected);

    flush();
  }));

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });
});
