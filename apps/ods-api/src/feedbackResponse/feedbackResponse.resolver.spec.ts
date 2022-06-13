import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResponseResolver } from './feedbackResponse.resolver';
import { FeedbackResponseService } from './feedbackResponse.service';
import {
  MockFeedbackResponses,
  MockFeedbackResponseCreateInput,
} from './feedbackResponse.repo';

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
});
