import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { TestUserCreateInput } from './user.repo';
import { User } from '.prisma/ods/client';

const userArray: User[] = [];

TestUserCreateInput.forEach((userCreateInput) => {
  const user: User = ((userCreateInput as unknown as User).id = uuidv4());
  userArray.push(user);
});

const oneUser = userArray[0];

const db = {
  user: {
    findMany: jest.fn().mockReturnValue(userArray),
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
});
