import { Test, TestingModule } from '@nestjs/testing';
import { OrgResolver } from './org.resolver';
import { OrgService } from './org.service';
import { MockOrgCreateInput, MockOrgs } from './org.repo';
import { UserService } from '../user/user.service';
import { SurveyService } from '../survey/survey.service';

describe('Org Resolver', () => {
  let resolver: OrgResolver;
  let service: OrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgResolver],
      providers: [
        {
          provide: OrgService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(MockOrgs),
            getSubOrgs: jest.fn().mockResolvedValue(MockOrgs),
            findUnique: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockOrgs[0])),
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockOrgs[0])),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockOrgs[0])),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
        {
          provide: UserService,
          useValue: {
            findMany: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: SurveyService,
          useValue: {
            findMany: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    resolver = module.get<OrgResolver>(OrgResolver);
    service = module.get<OrgService>(OrgService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of orgs', async () => {
      await expect(resolver.findMany({})).resolves.toEqual(MockOrgs);
    });
  });

  describe('getSubOrgs', () => {
    it('should get an array of orgs', async () => {
      await expect(resolver.getSubOrgs({ id: 'a uuid' })).resolves.toEqual(
        MockOrgs
      );
    });
  });

  describe('findUnqiue', () => {
    it('should get a single org', async () => {
      await expect(
        resolver.findUnique({ id: 'a strange id' })
      ).resolves.toEqual(MockOrgs[0]);
      await expect(
        resolver.findUnique({ id: 'a different id' })
      ).resolves.toEqual(MockOrgs[0]);
    });
  });

  describe('create', () => {
    it('should create a create org', async () => {
      await expect(resolver.create(MockOrgCreateInput[0])).resolves.toEqual(
        MockOrgs[0]
      );
    });
  });

  describe('update', () => {
    it('should update a org', async () => {
      await expect(
        resolver.update({ id: MockOrgs[0].id }, { orgTier: 'WING' })
      ).resolves.toEqual(MockOrgs[0]);
    });
  });

  describe('delete', () => {
    it('should return that it deleted a org', async () => {
      await expect(
        resolver.delete({ id: 'a uuid that exists' })
      ).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a org', async () => {
      const deleteSpy = jest
        .spyOn(service, 'delete')
        .mockResolvedValueOnce({ deleted: false });
      await expect(
        resolver.delete({ id: 'a uuid that does not exist' })
      ).resolves.toEqual({ deleted: false });
      expect(deleteSpy).toBeCalled();
    });
  });
});
