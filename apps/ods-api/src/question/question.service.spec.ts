import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionService } from './question.service';
import { v4 as uuidv4 } from 'uuid';
import { TestQuestionCreateInput } from './question.repo';
import { QuestionGQL } from '@odst/types/ods';

const questionArray: QuestionGQL[] = [];

TestQuestionCreateInput.forEach((questionCreateInput) => {
  const question: QuestionGQL = ((questionCreateInput as QuestionGQL).id =
    uuidv4());
  questionArray.push(question);
});

const oneQuestion = questionArray[0];

const db = {
  question: {
    findMany: jest.fn().mockReturnValue(questionArray),
    findUnique: jest.fn().mockResolvedValue(oneQuestion),
    create: jest.fn().mockResolvedValue(oneQuestion),
    update: jest.fn().mockResolvedValue(oneQuestion),
    delete: jest.fn().mockResolvedValue(oneQuestion),
    upsert: jest.fn().mockResolvedValue(oneQuestion),
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
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of questions', async () => {
      const questions = await service.findMany({});
      expect(questions).toEqual(questionArray);
    });
  });

  describe('findUnique', () => {
    it('should get a single question', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(
        oneQuestion
      );
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const question = await service.create(TestQuestionCreateInput[0]);
      expect(question).toEqual(oneQuestion);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const question = await service.update(
        { id: 'a uuid' },
        {
          surveys: { connect: { id: 'survey id' } },
        }
      );
      expect(question).toEqual(oneQuestion);
    });
  });

  describe('delete', () => {
    it('should return {deleted: true}', () => {
      expect(service.delete({ id: 'a uuid' })).resolves.toEqual({
        deleted: true,
      });
    });

    it('should return {deleted: false, message: err.message}', () => {
      const dbSpy = jest
        .spyOn(prisma.question, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });

  describe('upsert', () => {
    it('should call the upsert method', async () => {
      const question = await service.upsert(
        { id: 'a uuid' },
        {
          prompt: 'a prompt',
          surveys: { connect: { id: 'survey id' } },
        },
        {
          prompt: 'a new prompt',
        }
      );
      expect(question).toEqual(oneQuestion);
    });
  });
});

//   it('should find all questions from a specific survey', async () => {
//     const result = service.findQuestionsInSurvey('survey1');
//   });
// });
