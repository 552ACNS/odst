import { Test, TestingModule } from '@nestjs/testing';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';

describe('Answer Resolver', () => {
  let resolver: AnswerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerResolver],
      providers: [
        {
          provide: AnswerService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<AnswerResolver>(AnswerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
