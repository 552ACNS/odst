import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResolver } from './feedback.resolver';
import { FeedbackService } from './feedback.service';
import { MockFeedbackCreateInput, MockFeedbacks } from './feedback.repo';

describe('Feedback Resolver', () => {
  let resolver: FeedbackResolver;
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackResolver],
      providers: [
        {
          provide: FeedbackService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(MockFeedbacks),
            findUnique: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockFeedbacks[0])),
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockFeedbacks[0])),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockFeedbacks[0])),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    resolver = module.get<FeedbackResolver>(FeedbackResolver);
    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of feedbacks', async () => {
      await expect(resolver.findMany()).resolves.toEqual(MockFeedbacks);
    });
  });

  describe('findUnqiue', () => {
    it('should get a single feedback', async () => {
      await expect(
        resolver.findUnique({ id: 'a strange id' })
      ).resolves.toEqual(MockFeedbacks[0]);
      await expect(
        resolver.findUnique({ id: 'a different id' })
      ).resolves.toEqual(MockFeedbacks[0]);
    });
  });

  describe('create', () => {
    it('should create a create feedback', async () => {
      await expect(
        resolver.create(MockFeedbackCreateInput[0])
      ).resolves.toEqual(MockFeedbacks[0]);
    });
  });

  describe('update', () => {
    it('should update a feedback', async () => {
      await expect(
        resolver.update({ where: { id: 'a strange id' }, data: {} })
      ).resolves.toEqual(MockFeedbacks[0]);
    });
  });

  describe('delete', () => {
    it('should return that it deleted a feedback', async () => {
      await expect(
        resolver.delete({ id: 'a uuid that exists' })
      ).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a feedback', async () => {
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
