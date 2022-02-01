import { TestBed } from '@angular/core/testing';
import { CreatePersonService } from './create-person.service';


describe('CreateOrgService', () => {
  let service: CreatePersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
