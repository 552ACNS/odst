import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrgService } from './org.service';
import { MockOrgs } from './org.repo';

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

    service = module.get<OrgService>(OrgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrgNames', () => {
    it('should return an array of orgs', async () => {
      const orgs = await service.getOrgNames();
      expect(orgs).toEqual(MockOrgs.map((orgs) => orgs.name));
    });
  });
});
