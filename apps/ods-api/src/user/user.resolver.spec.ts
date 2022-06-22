import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MockUsers } from './user.repo';

describe('User Resolver', () => {
  let resolver: UserResolver;

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
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
