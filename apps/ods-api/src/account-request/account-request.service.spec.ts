import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AccountRequestService } from './account-request.service';
import {
  MockAccountRequestCreateInput,
  MockAccountRequests,
} from './account-request.repo';
import { MockOrgs } from '../org/org.repo';
import { MockUsers } from '../user/user.repo';

describe('AccountRequestService', () => {
  let service: AccountRequestService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountRequestService,
        {
          provide: PrismaService,
          useValue: {
            accountRequest: {
              findMany: jest.fn().mockReturnValue(MockAccountRequests),
              findUnique: jest.fn().mockResolvedValue(MockAccountRequests[0]),
              create: jest.fn().mockResolvedValue(MockAccountRequests[0]),
              update: jest.fn().mockResolvedValue(MockAccountRequests[0]),
            },
            org: {
              findMany: jest.fn().mockReturnValue(MockOrgs),
            },
            user: {
              create: jest.fn().mockResolvedValue(MockUsers[0]),
            },
            $transaction: jest
              .fn()
              .mockResolvedValue([MockAccountRequests[0], MockOrgs]),
          },
        },
      ],
    }).compile();

    service = module.get<AccountRequestService>(AccountRequestService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of accountRequests', async () => {
      const accountRequests = await service.findMany({});
      expect(accountRequests).toEqual(MockAccountRequests);
    });
  });

  describe('approveRequest', () => {
    it('should get a single User', () => {
      expect(
        service.approveRequest({ id: 'a uuid' }, MockUsers[0])
      ).resolves.toEqual(MockUsers[0]);
    });
  });

  describe('declineRequest', () => {
    it('should get a single User', () => {
      expect(service.declineRequest({ id: 'a uuid' })).resolves.toEqual(
        MockAccountRequests[0]
      );
    });
  });
});
