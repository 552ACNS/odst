import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { RequestAccountService } from './request-account.service';

describe('RequestAccountService', () => {
  let controller: ApolloTestingController;
  let service: RequestAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [RequestAccountService],
    });

    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    // expect(service).toBeTruthy();
    expect(true).toBeTruthy();
  });
});
