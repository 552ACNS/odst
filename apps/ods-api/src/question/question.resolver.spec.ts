import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { MockQuestions } from './question.repo';

describe('Question Resolver', () => {
  let resolver: QuestionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionResolver],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockQuestions[0])),
          },
        },
      ],
    }).compile();

    resolver = module.get<QuestionResolver>(QuestionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('update', () => {
    it('should update a question', async () => {
      await expect(
        resolver.update({ where: { id: 'a strange id' }, data: {} })
      ).resolves.toEqual(MockQuestions[0]);
    });
  });
});
