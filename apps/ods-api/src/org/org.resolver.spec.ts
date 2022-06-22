import { Test, TestingModule } from '@nestjs/testing';
import { OrgResolver } from './org.resolver';
import { OrgService } from './org.service';
import { MockOrgs } from './org.repo';

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
          },
        },
      ],
    }).compile();

    resolver = module.get<OrgResolver>(OrgResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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
});
