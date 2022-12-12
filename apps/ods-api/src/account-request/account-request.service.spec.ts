import { Test, TestingModule } from '@nestjs/testing';
import { AccountRequestService } from './account-request.service';
import { PrismaService } from '../prisma/prisma.service';
import { MockAccountRequests } from './account-request.repo';

const db = {
  accountRequest: {
    findUnique: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
  },
};

describe('AccountRequestService', () => {
  let service: AccountRequestService;
  let prisma: PrismaService;

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

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<AccountRequestService>(AccountRequestService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUnique', () => {
    it('should find an account request', async () => {
      const spy = jest.spyOn(prisma.accountRequest, 'findUnique');

      await service.findUnique({ id: 'account request id 1' });

      expect(spy).toHaveBeenCalledWith({
        where: { id: MockAccountRequests[0].id },
      });
    });
  });

  describe('update', () => {
    it('should update an account request', async () => {
      const spy = jest.spyOn(prisma.accountRequest, 'update');

      await service.update(
        {
          comments: {
            create: [
              {
                value: 'new comment',
                author: {
                  connect: {
                    id: 'something',
                  },
                },
              },
            ],
          },
        },
        {
          id: 'account request id 1',
        }
      );

      expect(spy).toBeCalled();
    });
  });

  //TODO - fix this test
  describe('comments', () => {
    it('should return comments', async () => {
      const spy = jest.spyOn(prisma.accountRequest, 'findUnique');

      await service.comments({ id: 'account request id 1' });

      expect(spy).toHaveBeenCalled();
    });
  });
});
