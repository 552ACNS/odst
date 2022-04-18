import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MockUsers } from './user.repo';

describe('User Resolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResolver],
      providers: [
        {
          provide: UserService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(MockUsers),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of users', async () => {
      await expect(resolver.findMany()).resolves.toEqual(MockUsers);
    });
  });
});
