import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AnswerService } from './answer.service';
import { MockAnswers, MockAnswerCreateInput } from './answer.repo';

const MockAnswer = MockAnswers[0];

const db = {
  answer: {
    findMany: jest.fn().mockReturnValue(MockAnswers),
    findUnique: jest.fn().mockResolvedValue(MockAnswer),
    create: jest.fn().mockResolvedValue(MockAnswer),
    update: jest.fn().mockResolvedValue(MockAnswer),
    delete: jest.fn().mockResolvedValue(MockAnswer),
  },
};

describe('AnswerService', () => {
  let service: AnswerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of answers', async () => {
      const answers = await service.findMany({});
      expect(answers).toEqual(MockAnswers);
    });
  });

  describe('findUnique', () => {
    it('should get a single answer', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(MockAnswer);
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const answer = await service.create(MockAnswerCreateInput[0]);
      expect(answer).toEqual(MockAnswer);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const answer = await service.update(
        { id: 'a uuid' },
        {
          question: { connect: { id: 'question id' } },
        }
      );
      expect(answer).toEqual(MockAnswer);
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
        .spyOn(prisma.answer, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
