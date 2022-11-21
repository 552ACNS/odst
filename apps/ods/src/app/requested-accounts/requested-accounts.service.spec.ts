import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { RequestedAccountsService } from './requested-accounts.service';

describe('Requested accounts service', () => {
  let controller: ApolloTestingController;
  let service: RequestedAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    controller = TestBed.inject(ApolloTestingController);
    service = TestBed.inject(RequestedAccountsService);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should get all current requested accounts from the backend because the user loads the page', fakeAsync(async () => {
    service.getRequestedAccounts().subscribe((response) => {
      expect(response.data.findManyAccountRequests[0].firstName).toEqual(
        'Higa'
      );
    });

    const op = controller.expectOne('FindManyAccountRequests');

    op.flush({
      data: {
        findManyAccountRequests: [
          {
            email: 'higa.drip.1@pain.mil',
            firstName: 'Higa',
            grade: 'O-10',
            id: 'Test ID',
            lastName: 'drip',
            orgs: [{ name: 'Monsters inc' }],
            role: 'CC',
            status: 'REQUESTED',
          },
        ],
      },
    });
    flush();
  }));

  it('should send an ID of a requested account to the backend because the user accepted it', fakeAsync(async () => {
    service.acceptAccountRequest('Test ID').subscribe((response) => {
      expect(response.data?.enableAccount.status).toEqual('ENABLED');
    });

    const op = controller.expectOne('ApproveAccountRequest');

    op.flush({
      data: {
        enableAccount: {
          id: 'Test ID',
          status: 'ENABLED',
        },
      },
    });
    flush();
  }));
});
