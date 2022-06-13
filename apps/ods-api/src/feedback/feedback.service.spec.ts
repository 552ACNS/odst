import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { FeedbackService } from './feedback.service';
import { MockFeedbackCreateInput, MockFeedbacks } from './feedback.repo';
import { MockQuestions } from '../question/question.repo';

const db = {
  feedback: {
    findMany: jest.fn().mockReturnValue(MockFeedbacks),
    findUnique: jest.fn().mockResolvedValue(MockFeedbacks[0]),
    create: jest.fn().mockResolvedValue(MockFeedbacks[0]),
    update: jest.fn().mockResolvedValue(MockFeedbacks[0]),
    delete: jest.fn().mockResolvedValue(MockFeedbacks[0]),
  },
  question: {
    findMany: jest.fn().mockReturnValue(MockQuestions),
  },
};

describe('FeedbackService', () => {
  let service: FeedbackService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUnique', () => {
    it('should get a single feedback', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(
        MockFeedbacks[0]
      );
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const feedback = await service.update({ id: 'a uuid' }, {});
      expect(feedback).toEqual(MockFeedbacks[0]);
    });
  });
});
