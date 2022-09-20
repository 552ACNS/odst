import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrgService } from './org.service';
import { MockOrgs } from './org.repo';
import { MockUsers } from '../user/user.repo';
import { OrgTier } from '@odst/types/ods';

const db = {
  org: {
    findUnique: jest.fn().mockResolvedValue(MockOrgs[0]),
    create: jest.fn().mockResolvedValue(MockOrgs[0]),
    update: jest.fn().mockResolvedValue(MockOrgs[0]),
    delete: jest.fn().mockResolvedValue(MockOrgs[0]),
    findMany: jest.fn().mockResolvedValue(MockOrgs),
  },
};

describe('OrgService', () => {
  let service: OrgService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrgService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<OrgService>(OrgService);

    //resets number of spy calls after each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserOrgsNames', () => {
    it('Should find all orgs that an individal is apart of and send back a string array', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getUserOrgsNames(MockUsers[0]);

      expect(spy).toHaveBeenCalledWith({
        select: {
          name: true,
        },
        where: {
          users: {
            some: {
              id: MockUsers[0].id,
            },
          },
        },
      });
    });
  });

  describe('createOrg', () => {
    it('Should create a new organization', async () => {
      const orgs = await service.createOrg(MockUsers[0], MockOrgs[0]);
      expect(orgs.id).toEqual(MockOrgs[0].id);
    });
  });

  describe('updateOrg', () => {
    it('Should update an organization', async () => {
      const orgs = await service.updateOrg(MockUsers[0], MockOrgs[0]);
      expect(orgs).toEqual(MockOrgs[0]);
    });
  });

  describe('getTiersByUser', () => {
    it('Should get all the org tiers they are allowed to create based of their unit tier', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getTiersByUser(MockUsers[0]);

      expect(spy).toHaveBeenCalledWith({
        select: {
          orgTier: true,
        },
        where: {
          users: {
            some: {
              id: MockUsers[0].id,
            },
          },
        },
      });
    });
  });

  describe('isAuthorizedToCreateOrg', () => {
    it('Should determines if a CC is authorized to create or update an organization based of their tier', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.isAuthorizedToCreateOrg(MockUsers[0], MockOrgs[0].orgTier);

      expect(spy).toHaveBeenCalledWith({
        select: {
          orgTier: true,
        },
        where: {
          users: {
            some: {
              id: MockUsers[0].id,
            },
          },
        },
      });
    });
  });

  describe('getOrgChildren', () => {
    it('Should get all the children of an org', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getOrgChildren(MockOrgs[0].name);

      expect(spy).toHaveBeenCalledWith({
        select: {
          name: true,
        },
        where: {
          parent: {
            name: {
              equals: MockOrgs[0].name,
            },
          },
        },
      });
    });
  });

  describe('getOrgTier', () => {
    it('Should gets the org tier of a squadron', async () => {
      const spy = jest.spyOn(prisma.org, 'findUnique');

      await service.getOrgTier(MockOrgs[0].name);

      expect(spy).toHaveBeenCalledWith({
        where: {
          name: MockOrgs[0].name,
        },
      });
    });
  });

  describe('getOrgsBelowTier', () => {
    it('Should get the organizations who do not have a parent org a tier below WING', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getOrgsBelowTier(OrgTier.WING);

      expect(spy).toHaveBeenCalledWith({
        select: {
          name: true,
        },
        where: {
          orgTier: { equals: OrgTier.GROUP },
          AND: {
            parent: {
              is: null,
            },
          },
        },
      });
    });

    it('Should get the organizations who do not have a parent org a tier below GROUP', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getOrgsBelowTier(OrgTier.GROUP);

      expect(spy).toHaveBeenCalledWith({
        select: {
          name: true,
        },
        where: {
          orgTier: { equals: OrgTier.SQUADRON },
          AND: {
            parent: {
              is: null,
            },
          },
        },
      });
    });

    it('Should get the organizations who do not have a parent org a tier below SQUADRON', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      const result = await service.getOrgsBelowTier(OrgTier.SQUADRON);

      expect(result).toEqual([]);

      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('Should get the organizations who do not have a parent org a tier below OTHER', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getOrgsBelowTier(OrgTier.OTHER);

      expect(spy).toHaveBeenCalledWith({
        select: {
          name: true,
        },
        where: {
          orgTier: [],
          AND: {
            parent: {
              is: null,
            },
          },
        },
      });
    });
  });

  describe('getOrgsBelowTierWithKeepParents', () => {
    it('Should get the organizations a tier below the selected orgTier', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getOrgsBelowTierWithKeepParents(OrgTier.GROUP);

      expect(spy).toHaveBeenCalledWith({
        select: {
          name: true,
        },
        where: {
          orgTier: { equals: OrgTier.SQUADRON },
        },
      });
    });
  });

  describe('getOrgsAboveTier', () => {
    it('Should get the organizations a tier above the WING', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      const result = await service.getOrgsAboveTier(OrgTier.WING);

      expect(result).toEqual([]);

      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('Should get the organizations a tier above the GROUP', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getOrgsAboveTier(OrgTier.GROUP);

      expect(spy).toHaveBeenCalledWith({
        select: {
          name: true,
        },
        where: {
          orgTier: { equals: OrgTier.WING },
        },
      });
    });

    it('Should get the organizations a tier above the SQUADRON', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getOrgsAboveTier(OrgTier.SQUADRON);

      expect(spy).toHaveBeenCalledWith({
        select: {
          name: true,
        },
        where: {
          orgTier: { equals: OrgTier.GROUP },
        },
      });
    });

    it('Should get the organizations a tier above OTHER', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getOrgsAboveTier(OrgTier.OTHER);

      expect(spy).toHaveBeenCalledWith({
        select: {
          name: true,
        },
        where: {
          orgTier: [],
        },
      });
    });
  });

  describe('checkOrg', () => {
    it('Should find out if an org name is already in use', async () => {
      const spy = jest.spyOn(prisma.org, 'findUnique');

      await service.checkOrg(MockOrgs[0].name);

      expect(spy).toHaveBeenCalledWith({
        where: {
          name: MockOrgs[0].name,
        },
      });
    });
  });

  describe('getOrgNames', () => {
    it('should return an array of orgs', async () => {
      const orgs = await service.getOrgNames();
      expect(orgs).toEqual(MockOrgs.map((orgs) => orgs.name));
    });
  });

  describe('getLineage', () => {
    it('should return the lineage of an org tree', async () => {
      const spy = jest.spyOn(prisma.org, 'findMany');

      await service.getLineage();

      expect(spy).toHaveBeenCalledWith({
        where: {
          name: {
            in: ['72 ABW', '552 ACW'],
          },
        },
        include: {
          children: {
            select: {
              name: true,
              children: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    });
  });

  describe('deleteOrg', () => {
    it('should delete an organization', async () => {
      const orgs = await service.deleteOrg({ name: MockOrgs[0].name });
      expect(orgs).toEqual(MockOrgs[0]);
    });
  });
});
