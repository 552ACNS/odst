import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AccountRequestService } from './accountRequest.service';
import { MockUsers } from './accountRequest.repo';

const db = {
  user: {
    findMany: jest.fn().mockReturnValue(MockUsers),
    update: jest.fn().mockReturnValue(MockUsers[1]),
  },
};

describe('UserService', () => {
  let service: AccountRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountRequestService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<AccountRequestService>(AccountRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
