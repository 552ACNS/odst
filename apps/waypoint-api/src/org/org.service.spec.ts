import { Test, TestingModule } from '@nestjs/testing';
import { Org, Prisma } from '.prisma/waypoint/client';
import { PrismaService } from '../prisma/prisma.service';
import { TestOrgCreateInput } from './org.repo';
import { OrgService } from './org.service';
import { prismaMock } from '../prisma/singleton';

describe('OrgService', () => {
  let service: OrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<OrgService>(OrgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should find an org', async () => {
    const orgInput = TestOrgCreateInput[0];
    const orgWhereUniqueInput: Prisma.OrgWhereUniqueInput = {
      name: orgInput.name,
    };

    await service.findUnique(orgWhereUniqueInput);

    expect(prismaMock.org.findUnique).toHaveBeenCalled();
  });

  it('Should create a new org', async () => {
    await service.create(TestOrgCreateInput[0]);
    expect(prismaMock.org.create).toHaveBeenCalled();
  });

  it('Should find multiple people', async () => {
    await service.findMany();

    expect(prismaMock.org.findMany).toHaveBeenCalled();
  });

  it('Should find a unique org', async () => {
    const orgInput: Prisma.OrgWhereUniqueInput = {
      name: TestOrgCreateInput[0].name,
    };
    await service.findUnique(orgInput.name as unknown as Org);

    expect(prismaMock.org.findUnique).toHaveBeenCalled();
  });

  it('Should update a org', async () => {
    const orgInput = TestOrgCreateInput[0];
    const orgWhereUniqueInput: Prisma.OrgWhereUniqueInput = {
      name: orgInput.name,
    };
    const orgUpdateInput: Prisma.OrgUpdateInput = {
      orgTier: 'SQUADRON',
    };

    await service.update(orgWhereUniqueInput, orgUpdateInput);
    expect(prismaMock.org.update).toHaveBeenCalled();
  });

  it('Should delete a org', async () => {
    const orgInput = TestOrgCreateInput[0];
    const orgWhereUniqueInput: Prisma.OrgWhereUniqueInput = {
      name: orgInput.name,
    };
    await service.delete(orgWhereUniqueInput);
    //expect(result).toEqual(orgInput as unknown as Org);

    expect(prismaMock.org.delete).toHaveBeenCalled();
  });

  it('Should find all orgs that are a sub org to the given org', async () => {
    TestOrgCreateInput.forEach((orgCreateInput) =>
      service.create(orgCreateInput)
    );

    const orgInput: Prisma.OrgWhereUniqueInput = {
      name: TestOrgCreateInput[0].name,
    };

    await service.findUnique(orgInput.name as unknown as Org);
    await service.getSubOrgs(orgInput);

    expect(prismaMock.org.findUnique).toHaveBeenCalled();
    //expect(prismaMock.org.findMany).toHaveBeenCalled();

    // TODO test the second half ot getSubOrgs method.
    // Right now, only the part where no sub orgs exist is tested
  });

  it('Should find a list of people skipiing 1, taking 3, with matching name', async () => {
    const orgInput = TestOrgCreateInput[3];
    const orgWhereUniqueInput: Prisma.OrgWhereUniqueInput = {
      name: orgInput.name,
    };

    const params = {
      skip: 1,
      take: 3,
      cursor: orgWhereUniqueInput,
    };

    await service.orgs(params);

    expect(prismaMock.org.findMany).toHaveBeenCalled();
  });

  it('Should find a list of people skipiing 3, taking 1, with matching name', async () => {
    const orgWhereInput: Prisma.OrgWhereInput = {
      orgTier: 'WING',
    };

    const params = {
      skip: 1,
      take: 3,
      where: orgWhereInput,
    };

    await service.orgs(params);

    expect(prismaMock.org.findMany).toHaveBeenCalled();
  });
});
