import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrgService } from './org.service';
import { v4 as uuidv4 } from 'uuid';
import { TestOrgCreateInput } from './org.repo';
import { OrgGQL } from '@odst/types/ods';

const orgArray: OrgGQL[] = [];

TestOrgCreateInput.forEach((orgCreateInput) => {
  const org: OrgGQL = ((orgCreateInput as OrgGQL).id = uuidv4());
  orgArray.push(org);
});

const oneOrg = orgArray[0];

const db = {
  org: {
    findMany: jest.fn().mockReturnValue(orgArray),
    getSubOrgs: jest.fn().mockReturnValue(orgArray),
    findUnique: jest.fn().mockResolvedValue(oneOrg),
    create: jest.fn().mockResolvedValue(oneOrg),
    update: jest.fn().mockResolvedValue(oneOrg),
    delete: jest.fn().mockResolvedValue(oneOrg),
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
      const orgs = await service.findMany();
      expect(orgs).toEqual(orgArray);
    });
  });

  describe('getSubOrgs', () => {
    it('should call the getSubOrgs method', async () => {
      const org = await service.getSubOrgs({ id: 'a uuid' });
      expect(org).toEqual(orgArray);
    });
  });

  describe('findUnique', () => {
    it('should get a single org', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(oneOrg);
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const org = await service.create(TestOrgCreateInput[0]);
      expect(org).toEqual(oneOrg);
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
      expect(org).toEqual(oneOrg);
    });
  });

  describe('delete', () => {
    it('should return {deleted: true}', () => {
      expect(service.delete({ id: 'a uuid' })).resolves.toEqual({
        deleted: true,
      });
    });

    it('should return {deleted: false, message: err.message}', () => {
      const dbSpy = jest
        .spyOn(prisma.org, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
