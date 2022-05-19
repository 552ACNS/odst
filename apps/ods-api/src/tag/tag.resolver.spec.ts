import { TestBed } from '@angular/core/testing';

import { TagResolver } from './tag.resolver';

describe('TagResolver', () => {
  let resolver: TagResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TagResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
