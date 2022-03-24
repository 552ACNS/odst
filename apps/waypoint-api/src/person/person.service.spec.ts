import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PersonService } from './person.service';
import { v4 as uuidv4 } from 'uuid';
import { TestPersonCreateInput } from './person.repo';
import { PersonGQL } from '@odst/types/waypoint';

const personArray: PersonGQL[] = [];

TestPersonCreateInput.forEach((personCreateInput) => {
  const person: PersonGQL = ((personCreateInput as unknown as PersonGQL).id =
    uuidv4());
  personArray.push(person);
});

const onePerson = personArray[0];

const db = {
  person: {
    findMany: jest.fn().mockReturnValue(personArray),
    findUnique: jest.fn().mockResolvedValue(onePerson),
    create: jest.fn().mockResolvedValue(onePerson),
    update: jest.fn().mockResolvedValue(onePerson),
    delete: jest.fn().mockResolvedValue(onePerson),
  },
};

describe('PersonService', () => {
  let service: PersonService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of persons', async () => {
      const persons = await service.findMany({});
      expect(persons).toEqual(personArray);
    });
  });

  describe('findManyInOrg', () => {
    it('should return an array of persons', async () => {
      const persons = await service.findManyInOrg({ id: 'a uuid' });
      expect(persons).toEqual(personArray);
    });
  });

  describe('findUnique', () => {
    it('should get a single person', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(onePerson);
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const person = await service.create(TestPersonCreateInput[0]);
      expect(person).toEqual(onePerson);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const person = await service.update(
        { id: 'a uuid' },
        {
          role: 'NONE',
        }
      );
      expect(person).toEqual(onePerson);
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
        .spyOn(prisma.person, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
