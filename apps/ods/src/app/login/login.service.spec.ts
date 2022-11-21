import { LoginService } from './login.service';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';

describe('LoginService', () => {
  let service: LoginService;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    controller = TestBed.inject(ApolloTestingController);
    service = TestBed.inject(LoginService);
  });

  it('ApiService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
