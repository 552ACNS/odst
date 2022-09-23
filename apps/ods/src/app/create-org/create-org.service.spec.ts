import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { OrgTier } from '../../types.graphql';
import { CreateOrgService } from './create-org.service';

describe('CreateOrgService', () => {
  let controller: ApolloTestingController;
  let service: CreateOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [CreateOrgService],
    });
    service = TestBed.inject(CreateOrgService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get orgs by tier below', fakeAsync(async () => {
    const children = {
      string: ['123 TEST'],
    };
    (await service.getOrgsByTierBelow(OrgTier.Group)).subscribe((response) => {
      expect(response).toEqual(children);
    });

    const op = controller.expectOne('getOrgsByTierBelow');

    op.flush({
      data: {
        getOrgsBelowTier: {
          string: ['123 TEST'],
        },
      },
    });
    flush();
  }));

  it('should get orgs by tier above', fakeAsync(async () => {
    const parent = {
      name: ['123 TEST'],
    };
    (await service.getOrgsByTierAbove(OrgTier.Squadron)).subscribe(
      (response) => {
        expect(response).toEqual(parent);
      }
    );

    const op = controller.expectOne('getOrgsByTierAbove');

    op.flush({
      data: {
        getOrgsAboveTier: {
          name: ['123 TEST'],
        },
      },
    });
    flush();
  }));

  it('should create the organization', fakeAsync(async () => {
    const data = {
      name: '123 TEST',
      orgTier: OrgTier.Group,
    };
    (await service.createOrg(data)).subscribe((response) => {
      expect(response.data?.createOrg).toEqual(data);
    });

    const op = controller.expectOne('CreateOrg');

    op.flush({
      data: {
        createOrg: {
          name: '123 TEST',
          orgTier: OrgTier.Group,
        },
      },
    });
    flush();
  }));

  it('should check if the org exists', fakeAsync(async () => {
    const org = {
      name: '123 TEST',
    };
    (await service.checkOrg('123 TEST')).subscribe((response) => {
      expect(response.data.checkOrg).toEqual(org);
    });

    const op = controller.expectOne('checkOrg');

    op.flush({
      data: {
        checkOrg: {
          name: '123 TEST',
        },
      },
    });
    flush();
  }));
});
