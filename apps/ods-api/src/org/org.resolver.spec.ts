import { Test, TestingModule } from '@nestjs/testing';
import { OrgResolver } from './org.resolver';
import { OrgService } from './org.service';
import { MockOrgs } from './org.repo';
import { MockUsers } from '../user/user.repo';
import { OrgTier } from '@odst/types/ods';

describe('Org Resolver', () => {
  let resolver: OrgResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgResolver],
      providers: [
        {
          provide: OrgService,
          useValue: {
            getOrgNames: jest
              .fn()
              .mockResolvedValue(MockOrgs.map((orgs) => orgs.name)),
            getLineage: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockOrgs[0].name)),
            getUserOrgsNames: jest.fn().mockResolvedValue(MockOrgs),
            getOrgChildren: jest.fn().mockResolvedValue(MockOrgs),
            checkOrg: jest.fn().mockResolvedValue(true),
            getOrgTier: jest.fn().mockResolvedValue(MockOrgs[0].orgTier),
            getOrgsBelowTier: jest.fn().mockResolvedValue(MockOrgs),
            getOrgsBelowTierWithKeepParents: jest
              .fn()
              .mockResolvedValue(MockOrgs),
            getOrgsAboveTier: jest.fn().mockResolvedValue(MockOrgs),
            getTiersByUser: jest.fn().mockResolvedValue(MockOrgs[0].orgTier),
            createOrg: jest.fn().mockResolvedValue(MockOrgs[0]),
            updateOrg: jest.fn().mockResolvedValue(MockOrgs[0]),
            delete: jest.fn().mockResolvedValue(MockOrgs[0]),
          },
        },
      ],
    }).compile();

    resolver = module.get<OrgResolver>(OrgResolver);
  });

  describe('getOrgNames', () => {
    it('should get an array of orgs names', async () => {
      await expect(resolver.getOrgNames()).resolves.toEqual(
        MockOrgs.map((orgs) => orgs.name)
      );
    });
  });

  describe('getOrgLineage', () => {
    it('should get an array of orgs names under a wing', async () => {
      await expect(resolver.getOrgLineage()).resolves.toEqual(MockOrgs[0].name);
    });
  });

  describe('getUserOrgsNames', () => {
    it('should get an array of orgs names that a user is apart of', async () => {
      await expect(resolver.getUserOrgsNames(MockUsers[0])).resolves.toEqual(
        MockOrgs
      );
    });
  });

  describe('getOrgChildren', () => {
    it('should get the children of an organization', async () => {
      await expect(resolver.getOrgChildren(MockOrgs[0].name)).resolves.toEqual(
        MockOrgs
      );
    });
  });

  describe('checkOrg', () => {
    it('should check if org name already exists', async () => {
      await expect(resolver.checkOrg(MockOrgs[0].name)).resolves.toEqual(true);
    });
  });

  describe('getOrgTier', () => {
    it('should get the orgTier of an organization', async () => {
      await expect(resolver.getOrgTier(MockOrgs[0].name)).resolves.toEqual(
        MockOrgs[0].orgTier
      );
    });
  });

  describe('getOrgsBelowTier', () => {
    it('should get all the orgs without parents from the tier below the inputted tier', async () => {
      await expect(
        resolver.getOrgsBelowTier(<OrgTier>MockOrgs[0].orgTier)
      ).resolves.toEqual(MockOrgs);
    });
  });

  describe('getOrgsBelowTierWithKeepParents', () => {
    it('should get all the orgs from the tier below the inputted tier', async () => {
      await expect(
        resolver.getOrgsBelowTierWithKeepParents(<OrgTier>MockOrgs[0].orgTier)
      ).resolves.toEqual(MockOrgs);
    });
  });

  describe('getOrgsAboveTier', () => {
    it('should get all the orgs from the tier above the inputted tier', async () => {
      await expect(
        resolver.getOrgsAboveTier(<OrgTier>MockOrgs[0].orgTier)
      ).resolves.toEqual(MockOrgs);
    });
  });

  describe('getTiersByUser', () => {
    it('should get all tiers that the user is allowed to create organizations of', async () => {
      await expect(resolver.getTiersByUser(MockUsers[0])).resolves.toEqual(
        MockOrgs[0].orgTier
      );
    });
  });

  describe('createOrg', () => {
    it('should create an organization', async () => {
      await expect(
        resolver.createOrg(MockUsers[0], MockOrgs[0])
      ).resolves.toEqual(MockOrgs[0].id);
    });
  });

  describe('updateOrg', () => {
    it('should update an organization', async () => {
      await expect(
        resolver.updateOrg({
          where: { name: 'old name' },
          data: { name: { set: 'new name' } },
        })
      ).resolves.toEqual(MockOrgs[0]);
    });
  });
});
