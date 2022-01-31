import { TestBed } from '@angular/core/testing';

import { CreateOrgService } from './create-org.service';

describe('CreateOrgService', () => {
  let service: CreateOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
