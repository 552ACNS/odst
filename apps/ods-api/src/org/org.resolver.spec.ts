import { Test, TestingModule } from '@nestjs/testing';
import { OrgResolver } from './org.resolver';
import { OrgService } from './org.service';
import { MockOrgCreateInput, MockOrgs } from './org.repo';

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
            getAllChildren: jest.fn().mockResolvedValue(MockOrgs),
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
            getLineage: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockOrgs[0].name)),
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

  describe('getOrgLineage', () => {
    it('should get an array of orgs names', async () => {
      await expect(resolver.getOrgLineage()).resolves.toEqual(MockOrgs[0].name);
    });
  });

  describe('getSubOrgs', () => {
    it('should get an array of orgs', async () => {
      await expect(resolver.getAllChildren({ id: 'a uuid' })).resolves.toEqual(
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
        resolver.update({ where: { id: 'a strange id' }, data: {} })
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
