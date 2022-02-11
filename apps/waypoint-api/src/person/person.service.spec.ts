import { Person, Prisma } from '.prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import {
  PersonWhereUniqueInput,
  PersonUpdateInput,
} from '@odst/types';
import { TestPersonCreateInput } from './person.repo';
import { PersonService } from './person.service';
import { prismaMock } from '../prisma/singleton';

describe('PersonsService', () => {
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should find a person', async () => {
    const personInput = TestPersonCreateInput[0];
    const personWhereUniqueInput: PersonWhereUniqueInput = {
      dodId: personInput.dodId,
    };

    const resolvedPerson: Person = personWhereUniqueInput as unknown as Person;
    await service.findUnique(resolvedPerson);

    expect(prismaMock.person.findUnique).toHaveBeenCalled();
  });

  it('Should find all people that share same org as an individual', async () => {
    TestPersonCreateInput.forEach((personCreateInput) =>
      service.create(personCreateInput)
    );

    const personInput: PersonWhereUniqueInput = {
      dodId: TestPersonCreateInput[0].dodId,
    };

    await service.findManyInOrg(personInput);

    expect(prismaMock.person.findUnique).toHaveBeenCalled();
    // expect(prismaMock.person.findMany).toHaveBeenCalled();

    // TODO test the second half ot getPersonsInOrg method.
    // Right now, only the part where no sub sub peeps exist is tested
  });

  it('Should create a new person', async () => {
    await service.create(TestPersonCreateInput[0]);

    expect(prismaMock.person.create).toHaveBeenCalled();
  });

  it('Should find multiple people', async () => {
    await service.findMany();

    expect(prismaMock.person.findMany).toHaveBeenCalled();
  });

  it('Should find a unique person', async () => {
    const personInput: PersonWhereUniqueInput = {
      dodId: TestPersonCreateInput[0].dodId,
    };

    await service.findUnique(personInput.dodId as unknown as Person);

    expect(prismaMock.person.findUnique).toHaveBeenCalled();
  });

  it('Should update a person', async () => {
    const personInput = TestPersonCreateInput[0];
    const personWhereUniqueInput: PersonWhereUniqueInput = {
      dodId: personInput.dodId,
    };
    const personUpdateInput: PersonUpdateInput = {
      hairColor: 'WHITE',
    };

    await service.update(personWhereUniqueInput, personUpdateInput);

    expect(prismaMock.person.update).toHaveBeenCalled();
  });

  it('Should delete a person', async () => {
    const personInput = TestPersonCreateInput[0];
    const personWhereUniqueInput: PersonWhereUniqueInput = {
      dodId: personInput.dodId,
    };
    await service.delete(personWhereUniqueInput);
    //expect(result).toEqual(personInput as unknown as Person);

    expect(prismaMock.person.delete).toHaveBeenCalled();
  });

  it('Should find a list of people skipiing 1, taking 3, with matching dodId', async () => {
    const personInput = TestPersonCreateInput[3];
    const personWhereUniqueInput: PersonWhereUniqueInput = {
      dodId: personInput.dodId,
    };

    const params = {
      skip: 1,
      take: 3,
      cursor: personWhereUniqueInput,
    };

    await service.persons(params);

    expect(prismaMock.person.findMany).toHaveBeenCalled();
  });

  it('Should find a list of people skipiing 3, taking 1, with matching dodId', async () => {
    const personWhereInput: Prisma.PersonWhereInput = {
      birthCountry: 'USA',
    };

    const params = {
      skip: 1,
      take: 3,
      where: personWhereInput,
    };

    await service.persons(params);

    expect(prismaMock.person.findMany).toHaveBeenCalled();
  });
});
