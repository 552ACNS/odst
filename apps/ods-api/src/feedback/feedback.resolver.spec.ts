import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResolver } from './feedback.resolver';
import { FeedbackService } from './feedback.service';
import { MockFeedbacks } from './feedback.repo';

describe('Feedback Resolver', () => {
  let resolver: FeedbackResolver;

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
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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

  describe('update', () => {
    it('should update a feedback', async () => {
      await expect(
        resolver.update({ where: { id: 'a strange id' }, data: {} })
      ).resolves.toEqual(MockFeedbacks[0]);
    });
  });
});
