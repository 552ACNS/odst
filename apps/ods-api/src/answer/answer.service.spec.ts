import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AnswerService } from './answer.service';
import { v4 as uuidv4 } from 'uuid';
import { TestAnswerCreateInput } from './answer.repo';
import { AnswerGQL } from '@odst/types/ods';

const answerArray: AnswerGQL[] = [];

TestAnswerCreateInput.forEach((answerCreateInput) => {
  const answer: AnswerGQL = ((answerCreateInput as unknown as AnswerGQL).id =
    uuidv4());
  answerArray.push(answer);
});

const oneAnswer = answerArray[0];

const db = {
  answer: {
    findMany: jest.fn().mockReturnValue(answerArray),
    findUnique: jest.fn().mockResolvedValue(oneAnswer),
    create: jest.fn().mockResolvedValue(oneAnswer),
    update: jest.fn().mockResolvedValue(oneAnswer),
    delete: jest.fn().mockResolvedValue(oneAnswer),
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
      expect(answers).toEqual(answerArray);
    });
  });

  describe('findUnique', () => {
    it('should get a single answer', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(
        oneAnswer
      );
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const answer = await service.create(TestAnswerCreateInput[0]);
      expect(answer).toEqual(oneAnswer);
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
      expect(answer).toEqual(oneAnswer);
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
