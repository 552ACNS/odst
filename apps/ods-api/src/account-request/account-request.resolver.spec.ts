import { Test, TestingModule } from '@nestjs/testing';
import { AccountRequestResolver } from './account-request.resolver';
import { AccountRequestService } from './account-request.service';
import {
  MockAccountRequestCreateInput,
  MockAccountRequests,
} from './account-request.repo';
import { MockUsers } from '../user/user.repo';

describe('AccountRequest Resolver', () => {
  let resolver: AccountRequestResolver;
  let service: AccountRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountRequestResolver],
      providers: [
        {
          provide: AccountRequestService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(MockAccountRequests),
            approveRequest: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockUsers[0])),
            declineRequest: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(MockAccountRequests[0])
              ),
            create: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(MockAccountRequests[0])
              ),
          },
        },
      ],
    }).compile();

    resolver = module.get<AccountRequestResolver>(AccountRequestResolver);
    service = module.get<AccountRequestService>(AccountRequestService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of accountRequests', async () => {
      await expect(resolver.findMany(MockUsers[0])).resolves.toEqual(
        MockAccountRequests
      );
    });
  });

  describe('approveRequest', () => {
    it('should approve request and return resulting user', async () => {
      await expect(
        resolver.approveRequest({ id: MockAccountRequests[0].id }, MockUsers[0])
      ).resolves.toEqual(MockUsers[0]);
    });
  });

  describe('declineRequest', () => {
    it('should decline request', async () => {
      await expect(
        resolver.declineRequest({ id: MockAccountRequests[0].id })
      ).resolves.toEqual(MockAccountRequests[0]);
    });
  });

  describe('create', () => {
    it('should create a create accountRequest', async () => {
      await expect(
        resolver.create(MockAccountRequestCreateInput[0])
      ).resolves.toEqual(MockAccountRequests[0]);
    });
  });
});
