import { Test, TestingModule } from '@nestjs/testing';
import { AccountRequestResolver } from './account-request.resolver';
import { AccountRequestService } from './account-request.service';
import { MockAccountRequests } from './account-request.repo';

describe('AccountRequestResolver', () => {
  let resolver: AccountRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountRequestResolver],
      providers: [
        {
          provide: AccountRequestService,
          useValue: {
            findUnique: jest.fn().mockResolvedValue(MockAccountRequests[0]),
            update: jest.fn().mockResolvedValue(MockAccountRequests[0]),
            comments: jest
              .fn()
              .mockResolvedValue(MockAccountRequests[0].comments),
          },
        },
      ],
    }).compile();

    resolver = module.get<AccountRequestResolver>(AccountRequestResolver);
  });

  describe('findUnique', () => {
    it('should find unique', async () => {
      await expect(resolver.findUnique({ id: 'user id 1' })).resolves.toEqual(
        MockAccountRequests[0]
      );
    });
  });

  describe('update', () => {
    it('should update', async () => {
      await expect(
        resolver.update({
          where: { id: 'user id 1' },
          data: {
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
        })
      ).resolves.toEqual(MockAccountRequests[0]);
    });
  });

  describe('comments', () => {
    it('should comments', async () => {
      await expect(
        resolver.comments({
          id: 'user id 1',
          userId: 'user id 1',
        })
      ).resolves.toEqual(MockAccountRequests[0].comments);
    });
  });
});
