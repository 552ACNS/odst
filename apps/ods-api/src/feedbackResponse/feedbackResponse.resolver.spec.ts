import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResponseResolver } from './feedbackResponse.resolver';
import { FeedbackResponseService } from './feedbackResponse.service';
import {
  MockFeedbackResponses,
  MockFeedbackResponseCreateInput,
} from './feedbackResponse.repo';
import { User } from '@odst/types/ods';

describe('FeedbackResponse Resolver', () => {
  let resolver: FeedbackResponseResolver;
  let service: FeedbackResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackResponseResolver],
      providers: [
        {
          provide: FeedbackResponseService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(MockFeedbackResponses),
            findUnique: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(MockFeedbackResponses[0])
              ),
            create: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(MockFeedbackResponses[0])
              ),
            update: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(MockFeedbackResponses[0])
              ),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    resolver = module.get<FeedbackResponseResolver>(FeedbackResponseResolver);
    service = module.get<FeedbackResponseService>(FeedbackResponseService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of feedbackResponses', async () => {
      await expect(
        resolver.findMany(new User(), { where: {} })
      ).resolves.toEqual(MockFeedbackResponses);
    });
  });

  describe('findUnique', () => {
    it('should get a single feedbackResponse', async () => {
      await expect(
        resolver.findUnique({ id: 'a strange id' })
      ).resolves.toEqual(MockFeedbackResponses[0]);
      await expect(
        resolver.findUnique({ id: 'a different id' })
      ).resolves.toEqual(MockFeedbackResponses[0]);
    });
  });

  describe('create', () => {
    it('should create a create feedbackResponse', async () => {
      await expect(
        resolver.create(MockFeedbackResponseCreateInput[0])
      ).resolves.toEqual(MockFeedbackResponses[0]);
    });
  });

  describe('update', () => {
    it('should update a feedbackResponse', async () => {
      await expect(
        resolver.update({ where: { id: 'a strange id' }, data: {} })
      ).resolves.toEqual(MockFeedbackResponses[0]);
    });
  });

  describe('delete', () => {
    it('should return that it deleted a feedbackResponse', async () => {
      await expect(
        resolver.delete({ id: 'a uuid that exists' })
      ).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a feedbackResponse', async () => {
      const deleteSpy = jest
        .spyOn(service, 'delete')
        .mockResolvedValueOnce({ deleted: false });
      await expect(
        resolver.delete({ id: 'a uuid that does not exist' })
      ).resolves.toEqual({ deleted: false });
      expect(deleteSpy).toBeCalled();
    });
  });
});
