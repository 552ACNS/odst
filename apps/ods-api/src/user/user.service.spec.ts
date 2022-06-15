import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { MockUsers } from './user.repo';

const db = {
  user: {
    findMany: jest.fn().mockReturnValue(MockUsers),
    update: jest.fn().mockReturnValue(MockUsers[1]),
  },
};

describe('UserService', () => {
  let service: UserService;

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
  describe('enableAccount', () => {
    it('should enable an account', async () => {
      const result = await service.enableAccount({ email: 'email2' });
      expect(result).toEqual(MockUsers[1]);
    });
  });
});
