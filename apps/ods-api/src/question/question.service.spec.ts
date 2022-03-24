import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockQuestions, mockQuestionCreateInputs } from './question.repo';

//Mock the db
const prismaDB = {
  question: {
    create: jest.fn().mockResolvedValue(mockQuestions[0]),
    findMany: jest.fn().mockResolvedValue(mockQuestions),
  },
};

describe('QuestionService', () => {
  let service: QuestionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: PrismaService,
          useValue: prismaDB,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new question ', async () => {
    const result = service.create(mockQuestionCreateInputs[0]);
    const expected = mockQuestions[0];

    expect(result).resolves.toEqual(expected);
  });

  it('should find all questions from a specific survey', async () => {
    const result = service.findQuestionsInSurvey('survey1')

    const expected = mockQuestionCreateInputs.

    expect(result).resolves.toEqual(
      mockQuestions
    );
  });
});
