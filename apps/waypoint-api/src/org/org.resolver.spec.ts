import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrgResolver } from './org.resolver';
import { OrgService } from './org.service';
import { OrgCreateInput, OrgGQL, OrgUpdateInput } from '@odst/types';
import { TestOrgCreateInput } from './org.repo';

describe('OrgResolver', () => {
  let resolver: OrgResolver;
  let servicer: OrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgResolver, OrgService, PrismaService, OrgService],
    }).compile();

    resolver = module.get<OrgResolver>(OrgResolver);
    servicer = module.get<OrgService>(OrgService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call the method to create an org', async () => {
    // TEST PARAMS
    const createdOrg: OrgCreateInput = TestOrgCreateInput[0];
    const methodToSpy = 'create';

    // TODO: Seems awkward to cast the org here, but I don't know how to do it otherwise
    const resolvedOrg: OrgGQL = createdOrg as unknown as OrgGQL;

    // Change value of promise
    const result: Promise<OrgGQL> = Promise.resolve(resolvedOrg);

    //Make it so that the createOrg method returns the fake org
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the createOrg method by calling the controller
    const actual = await resolver.create(createdOrg);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toBe(resolvedOrg);
  });

  it('should call the method to find all orgs', async () => {
    // TEST PARAMS
    const methodToSpy = 'findMany';

    const resolvedOrgs: OrgGQL[] = TestOrgCreateInput.map(
      (org) => org as unknown as OrgGQL,
    );

    // Change value of promise
    const result: Promise<OrgGQL[]> = Promise.resolve(resolvedOrgs);

    //Make it so that the createOrg method returns the fake org
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the createOrg method by calling the controller
    const actual = await resolver.findMany();
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedOrgs);
  });

  it('should call the method to find an org`s subOrgs', async () => {
    // TEST PARAMS
    const methodToSpy = 'getSubOrgs';

    const resolvedOrgs: OrgGQL[] = TestOrgCreateInput.map(
      (org) => org as unknown as OrgGQL,
    );

    const parentOrg: OrgGQL = TestOrgCreateInput[0] as unknown as OrgGQL;

    // Change value of promise
    const result: Promise<OrgGQL[]> = Promise.resolve(resolvedOrgs);

    //Make it so that the createOrg method returns the fake org
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the createOrg method by calling the controller
    await resolver.getSubOrgs(parentOrg);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    // await expect(actual).resolves.toEqual(true);

    // expect(actual).toStrictEqual(resolvedOrgs);
  });

  it('should call the method to update an org', async () => {
    // TEST PARAMS
    const originalOrg: OrgCreateInput = TestOrgCreateInput[0];
    const updatedOrg: OrgUpdateInput = TestOrgCreateInput[1];
    const methodToSpy = 'update';

    // TODO: Seems awkward to cast the org here, but I don't know how to do it otherwise
    const resolvedOrg: OrgGQL = originalOrg as unknown as OrgGQL;

    // Change value of promise
    const result: Promise<OrgGQL> = Promise.resolve(resolvedOrg);

    //Make it so that the createOrg method returns the fake org
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the update method by calling the resolver
    const actual = await resolver.update(originalOrg, updatedOrg);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toBe(resolvedOrg);
  });
});
