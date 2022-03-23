import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { PrismaMock } from './../prisma/singleton';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Question } from '.prisma/ods/client';


describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user ', async () => {
    const question: Prisma.QuestionCreateInput = {
      prompt: 'What is your name?',
      id: '1',
    }
  
    PrismaMock.question.create.mockResolvedValue(question)
  
    await expect(createUser(user)).resolves.toEqual({
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
    })
  })
});
