import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionService } from './question.service';
import { MockQuestionCreateInput, MockQuestions } from './question.repo';

const db = {
  question: {
    findMany: jest.fn().mockReturnValue(MockQuestions),
    findUnique: jest.fn().mockResolvedValue(MockQuestions[0]),
    create: jest.fn().mockResolvedValue(MockQuestions[0]),
    update: jest.fn().mockResolvedValue(MockQuestions[0]),
    delete: jest.fn().mockResolvedValue(MockQuestions[0]),
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
      expect(questions).toEqual(MockQuestions);
    });
  });

  describe('findUnique', () => {
    it('should get a single question', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(
        MockQuestions[0]
      );
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const question = await service.create(MockQuestionCreateInput[0]);
      expect(question).toEqual(MockQuestions[0]);
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
      expect(question).toEqual(MockQuestions[0]);
    });
  });

  describe('delete', () => {
    it('should return {deleted: true}', () => {
      expect(service.delete({ id: 'a uuid' })).resolves.toEqual({
        deleted: true,
      });
    });

    it('should return {deleted: false, message: err.message}', () => {
      jest
        .spyOn(prisma.question, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});

//   it('should find all questions from a specific survey', async () => {
//     const result = service.findQuestionsInSurvey('survey1');
//   });
// });
