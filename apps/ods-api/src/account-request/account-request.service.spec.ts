import { Test, TestingModule } from '@nestjs/testing';
import { AccountRequestService } from './account-request.service';

describe('AccountRequestService', () => {
  let service: AccountRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountRequestService],
    }).compile();

    service = module.get<AccountRequestService>(AccountRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
