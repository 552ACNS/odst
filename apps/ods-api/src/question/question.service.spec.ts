import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionService } from './question.service';
import { MockQuestions } from './question.repo';

const db = {
  question: {
    update: jest.fn().mockResolvedValue(MockQuestions[0]),
  },
};

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const question = await service.update(
        { id: 'a uuid' },
        {
          feedbacks: { connect: { id: 'feedback id' } },
        }
      );
      expect(question).toEqual(MockQuestions[0]);
    });
  });
});
