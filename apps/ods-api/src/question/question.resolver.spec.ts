import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { MockQuestionCreateInput, MockQuestions } from './question.repo';

describe('Question Resolver', () => {
  let resolver: QuestionResolver;
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionResolver],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(MockQuestions),
            getSubQuestions: jest.fn().mockResolvedValue(MockQuestions),
            findUnique: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockQuestions[0])),
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockQuestions[0])),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockQuestions[0])),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    resolver = module.get<QuestionResolver>(QuestionResolver);
    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of questions', async () => {
      await expect(resolver.findMany({})).resolves.toEqual(MockQuestions);
    });
  });

  describe('findUnqiue', () => {
    it('should get a single question', async () => {
      await expect(
        resolver.findUnique({ id: 'a strange id' })
      ).resolves.toEqual(MockQuestions[0]);
      await expect(
        resolver.findUnique({ id: 'a different id' })
      ).resolves.toEqual(MockQuestions[0]);
    });
  });

  describe('create', () => {
    it('should create a create question', async () => {
      await expect(
        resolver.create(MockQuestionCreateInput[0])
      ).resolves.toEqual(MockQuestions[0]);
    });
  });

  describe('update', () => {
    it('should update a question', async () => {
      await expect(
        resolver.update({ id: 'a uuid' }, { prompt: 'new prompt' })
      ).resolves.toEqual(MockQuestions[0]);
    });
  });
});
