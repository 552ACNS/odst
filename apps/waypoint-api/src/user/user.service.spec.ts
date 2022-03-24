import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { TestUserCreateInput } from './user.repo';
import { UserGQL } from '@odst/types/waypoint';

const userArray: UserGQL[] = [];

TestUserCreateInput.forEach((userCreateInput) => {
  const user: UserGQL = ((userCreateInput as unknown as UserGQL).id = uuidv4());
  userArray.push(user);
});

const oneUser = userArray[0];

const db = {
  user: {
    findMany: jest.fn().mockReturnValue(userArray),
    findUnique: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockResolvedValue(oneUser),
    update: jest.fn().mockResolvedValue(oneUser),
    delete: jest.fn().mockResolvedValue(oneUser),
  },
};

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of users', async () => {
      const users = await service.findMany({});
      expect(users).toEqual(userArray);
    });
  });

  describe('findUnique', () => {
    it('should get a single user', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(oneUser);
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const user = await service.create(TestUserCreateInput[0]);
      expect(user).toEqual(oneUser);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const user = await service.update(
        { id: 'a uuid' },
        {
          enabled: false,
        }
      );
      expect(user).toEqual(oneUser);
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
        .spyOn(prisma.user, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
