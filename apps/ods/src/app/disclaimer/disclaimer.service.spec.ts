import { TestBed } from '@angular/core/testing';

import { DisclaimerService } from './disclaimer.service';

describe('DisclaimerService', () => {
  let service: DisclaimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisclaimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
