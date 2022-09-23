import { fakeAsync, TestBed, flush } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { OrgTier } from '../../types.graphql';
import { EditOrgService } from './edit-org.service';

describe('CreateOrgService', () => {
  let controller: ApolloTestingController;
  let service: EditOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [EditOrgService],
    });
    service = TestBed.inject(EditOrgService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Orgs based off the user', fakeAsync(async () => {
    const org = {
      name: ['123 TEST'],
    };
    //The subscribe will not exit until the response is resolved.
    (await service.getUserOrgsNames()).subscribe((response) => {
      //Make some assertion about the result
      expect(response).toEqual(org);
    });

    //Catches the outgoing request body held in the controller, which is the acting backend
    const op = controller.expectOne('getUserOrgsNames');

    //Returns data to the subscribe from before
    op.flush({
      data: {
        getUserOrgsNames: {
          name: ['123 TEST'],
        },
      },
    });
    flush();
  }));

  it('should update the org', fakeAsync(async () => {
    const data = {
      where: {},
      data: {
        name: {
          set: '123 EDIT',
        },
        children: {
          set: [],
        },
      },
    };
    (await service.updateOrg(data)).subscribe((response) => {
      expect(response.data?.updateOrg.name).toEqual('123 TEST');
    });

    const op = controller.expectOne('updateOrg');

    op.flush({
      data: {
        updateOrg: {
          name: '123 TEST',
        },
      },
    });
    flush();
  }));

  it('should get da kiddos', fakeAsync(async () => {
    const children = {
      name: ['456 TEST'],
    };
    (await service.getChildren('123 TEST')).subscribe((response) => {
      expect(response).toEqual(children);
    });

    const op = controller.expectOne('getChildren');

    op.flush({
      data: {
        getOrgChildren: {
          name: ['456 TEST'],
        },
      },
    });
    flush();
  }));

  it('should get the org tier', fakeAsync(async () => {
    const tier = {
      orgTier: OrgTier.Group,
    };
    (await service.getOrgTier('123 TEST')).subscribe((response) => {
      expect(response).toEqual(tier);
    });

    const op = controller.expectOne('getOrgTier');

    op.flush({
      data: {
        getOrgTier: {
          orgTier: 'GROUP',
        },
      },
    });
    flush();
  }));

  it('should get orgs by tier below', fakeAsync(async () => {
    const children = {
      string: ['123 TEST'],
    };
    (await service.getOrgsByTierBelow(OrgTier.Group)).subscribe((response) => {
      expect(response).toEqual(children);
    });

    const op = controller.expectOne('getTiersBelowKeepParents');

    op.flush({
      data: {
        getOrgsBelowTierWithKeepParents: {
          string: ['123 TEST'],
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
