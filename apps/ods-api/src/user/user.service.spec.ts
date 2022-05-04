import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { MockUsers } from './user.repo';

const db = {
  user: {
    findMany: jest.fn().mockReturnValue(MockUsers),
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
      expect(users).toEqual(MockUsers);
    });
  });
});
