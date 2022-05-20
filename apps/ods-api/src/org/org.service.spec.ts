import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrgService } from './org.service';
import { MockOrgCreateInput, MockOrgs } from './org.repo';

const db = {
  org: {
    findMany: jest.fn().mockReturnValue(MockOrgs),
    getSubOrgs: jest.fn().mockReturnValue(MockOrgs),
    findUnique: jest.fn().mockResolvedValue(MockOrgs[0]),
    create: jest.fn().mockResolvedValue(MockOrgs[0]),
    update: jest.fn().mockResolvedValue(MockOrgs[0]),
    delete: jest.fn().mockResolvedValue(MockOrgs[0]),
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

    service = module.get<OrgService>(OrgService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of orgs', async () => {
      const orgs = await service.findMany({});
      expect(orgs).toEqual(MockOrgs);
    });
  });

  describe('getSubOrgs', () => {
    it('should call the getSubOrgs method', async () => {
      const org = await service.getAllChildren({ id: 'a uuid' });
      expect(org).toEqual(MockOrgs);
    });
  });

  describe('findUnique', () => {
    it('should get a single org', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(
        MockOrgs[0]
      );
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const org = await service.create(MockOrgCreateInput[0]);
      expect(org).toEqual(MockOrgs[0]);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const org = await service.update(
        { id: 'a uuid' },
        {
          orgTier: 'WING',
        }
      );
      expect(org).toEqual(MockOrgs[0]);
    });
  });

  describe('delete', () => {
    it('should return {deleted: true}', () => {
      expect(service.delete({ id: 'a uuid' })).resolves.toEqual({
        deleted: true,
      });
    });

    it('should return {deleted: false, message: err.message}', () => {
      jest
        .spyOn(prisma.org, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
