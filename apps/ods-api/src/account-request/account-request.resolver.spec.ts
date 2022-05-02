import { Test, TestingModule } from '@nestjs/testing';
import { AccountRequestResolver } from './account-request.resolver';
import { AccountRequestService } from './account-request.service';

describe('AccountRequestResolver', () => {
  let resolver: AccountRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountRequestResolver, AccountRequestService],
    }).compile();

    resolver = module.get<AccountRequestResolver>(AccountRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
