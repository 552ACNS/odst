import { Test, TestingModule } from '@nestjs/testing';
import { AnswerResolver } from './answer.resolver';
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

describe('Answer Resolver', () => {
  let resolver: AnswerResolver;
  let service: AnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerResolver],
      providers: [
        {
          provide: AnswerService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(answerArray),
            getSubAnswers: jest.fn().mockResolvedValue(answerArray),
            findUnique: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneAnswer)),
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneAnswer)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneAnswer)),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    resolver = module.get<AnswerResolver>(AnswerResolver);
    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of answers', async () => {
      await expect(resolver.findMany()).resolves.toEqual(answerArray);
    });
  });

  describe('findUnqiue', () => {
    it('should get a single answer', async () => {
      await expect(
        resolver.findUnique({ id: 'a strange id' })
      ).resolves.toEqual(answerArray[0]);
      await expect(
        resolver.findUnique({ id: 'a different id' })
      ).resolves.toEqual(answerArray[0]);
    });
  });

  describe('create', () => {
    it('should create a create answer', async () => {
      await expect(resolver.create(TestAnswerCreateInput[0])).resolves.toEqual(
        answerArray[0]
      );
    });
  });

  describe('update', () => {
    it('should update a answer', async () => {
      await expect(
        resolver.update({ id: oneAnswer.id }, { value: 'new prompt' })
      ).resolves.toEqual(oneAnswer);
    });
  });

  describe('delete', () => {
    it('should return that it deleted a answer', async () => {
      await expect(
        resolver.delete({ id: 'a uuid that exists' })
      ).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a answer', async () => {
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
