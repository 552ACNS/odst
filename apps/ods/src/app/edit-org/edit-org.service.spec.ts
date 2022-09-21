import { TestBed } from '@angular/core/testing';
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

  it('should get Orgs based off the user', async () => {
    //The subscribe will not exit until the response is resolved.
    (await service.getUserOrgsNames()).subscribe((response) => {
      //Make some assertion about the result
      expect(response.map.name).toEqual('123 TEST');
    });

    //Catches the outgoing request body held in the controller, which is the acting backend
    const op = controller.expectOne('getUserOrgsNames');

    //Returns data to the subscribe from before
    op.flush({
      data: {
        orgs: {
          name: '123 TEST',
          id: '00000000-0000-0000-0000-000000000000',
          orgTier: 'GROUP',
          users: [],
          parentId: undefined,
          children: {
            set: {
              name: '456 CHILD',
              id: '11100000-0000-0000-0000-000000000111',
              orgTier: 'SQUADRON',
              users: [],
              parentId: '00000000-0000-0000-0000-000000000000',
              children: [],
              feedbacks: [],
            },
          },
          feedbacks: [],
        },
      },
    });
  });

  it('should update the org', async () => {
    (
      await service.updateOrg({
        where: {},
        data: {
          name: {
            set: '123 EDIT',
          },
          children: {
            set: [],
          },
        },
      })
    ).subscribe((response) => {
      expect(response.data?.updateOrg.name).toEqual('123 TEST');
    });

    const op = controller.expectOne('updateOrg');

    op.flush({
      data: {
        orgs: {
          name: '123 TEST',
          id: '00000000-0000-0000-0000-000000000000',
          orgTier: 'GROUP',
          users: [],
          parentId: undefined,
          children: {
            set: {
              name: '456 CHILD',
              id: '11100000-0000-0000-0000-000000000111',
              orgTier: 'SQUADRON',
              users: [],
              parentId: '00000000-0000-0000-0000-000000000000',
              children: [],
              feedbacks: [],
            },
          },
          feedbacks: [],
        },
      },
    });
  });

  it('should get da kiddos', async () => {
    (await service.getChildren('123 TEST')).subscribe((response) => {
      expect(response.map.name).toEqual('456 CHILD');
    });

    const op = controller.expectOne('getChildren');

    op.flush({
      data: {
        orgs: {
          name: '123 TEST',
          id: '00000000-0000-0000-0000-000000000000',
          orgTier: 'GROUP',
          users: [],
          parentId: undefined,
          children: {
            set: {
              name: '456 CHILD',
              id: '11100000-0000-0000-0000-000000000111',
              orgTier: 'SQUADRON',
              users: [],
              parentId: '00000000-0000-0000-0000-000000000000',
              children: [],
              feedbacks: [],
            },
          },
          feedbacks: [],
        },
      },
    });
  });

  it('should get the org tier', async () => {
    (await service.getOrgTier('123 TEST')).subscribe((response) => {
      expect(response).toEqual('GROUP');
    });

    const op = controller.expectOne('getOrgTier');

    op.flush({
      data: {
        orgs: {
          name: '123 TEST',
          id: '00000000-0000-0000-0000-000000000000',
          orgTier: 'GROUP',
          users: [],
          parentId: undefined,
          children: {
            set: {
              name: '456 CHILD',
              id: '11100000-0000-0000-0000-000000000111',
              orgTier: 'SQUADRON',
              users: [],
              parentId: '00000000-0000-0000-0000-000000000000',
              children: [],
              feedbacks: [],
            },
          },
          feedbacks: [],
        },
      },
    });
  });

  it('should get orgs by tier below', async () => {
    (await service.getOrgsByTierBelow(OrgTier.Group)).subscribe((response) => {
      expect(response.map.name).toEqual('456 CHILD');
    });

    const op = controller.expectOne('getTiersBelowKeepParents');

    op.flush({
      data: {
        orgs: {
          name: '123 TEST',
          id: '00000000-0000-0000-0000-000000000000',
          orgTier: 'GROUP',
          users: [],
          parentId: undefined,
          children: {
            set: {
              name: '456 CHILD',
              id: '11100000-0000-0000-0000-000000000111',
              orgTier: 'SQUADRON',
              users: [],
              parentId: '00000000-0000-0000-0000-000000000000',
              children: [],
              feedbacks: [],
            },
          },
          feedbacks: [],
        },
      },
    });
  });

  it('should check if the org exists', async () => {
    (await service.checkOrg('123 TEST')).subscribe((response) => {
      expect(response).toEqual(true);
    });

    const op = controller.expectOne('checkOrg');

    op.flush({
      data: {
        orgs: {
          name: '123 TEST',
          id: '00000000-0000-0000-0000-000000000000',
          orgTier: 'GROUP',
          users: [],
          parentId: undefined,
          children: {
            set: {
              name: '456 CHILD',
              id: '11100000-0000-0000-0000-000000000111',
              orgTier: 'SQUADRON',
              users: [],
              parentId: '00000000-0000-0000-0000-000000000000',
              children: [],
              feedbacks: [],
            },
          },
          feedbacks: [],
        },
      },
    });
  });
});
