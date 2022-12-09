import { Test, TestingModule } from '@nestjs/testing';
import { AccountRequestResolver } from './accountRequest.resolver';
import { AccountRequestService } from './accountRequest.service';
import { MockUsers } from './accountRequest.repo';

describe('User Resolver', () => {
  let resolver: AccountRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountRequestResolver],
      providers: [
        {
          provide: AccountRequestService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(MockUsers),
          },
        },
      ],
    }).compile();

    resolver = module.get<AccountRequestResolver>(AccountRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
