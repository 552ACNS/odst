import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyService } from './survey.service';
import { v4 as uuidv4 } from 'uuid';
import { TestSurveyCreateInput } from './survey.repo';
import { TestQuestionCreateInput } from '../question/question.repo';
import { Survey, Question } from '.prisma/ods/client';

const surveyArray: Survey[] = [];

TestSurveyCreateInput.forEach((surveyCreateInput) => {
  const survey: Survey = ((surveyCreateInput as Survey).id = uuidv4());
  surveyArray.push(survey);
});

const oneSurvey = surveyArray[0];

const questionArray: Question[] = [];

TestQuestionCreateInput.forEach((questionCreateInput) => {
  const question: Question = ((questionCreateInput as Question).id = uuidv4());
  questionArray.push(question);
});

const db = {
  survey: {
    findMany: jest.fn().mockReturnValue(surveyArray),
    findUnique: jest.fn().mockResolvedValue(oneSurvey),
    create: jest.fn().mockResolvedValue(oneSurvey),
    update: jest.fn().mockResolvedValue(oneSurvey),
    delete: jest.fn().mockResolvedValue(oneSurvey),
  },
  question: {
    findMany: jest.fn().mockReturnValue(questionArray),
  },
};

describe('SurveyService', () => {
  let service: SurveyService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of surveys', async () => {
      const surveys = await service.findMany({});
      expect(surveys).toEqual(surveyArray);
    });
  });

  describe('findUnique', () => {
    it('should get a single survey', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(oneSurvey);
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const survey = await service.create(TestSurveyCreateInput[0]);
      expect(survey).toEqual(oneSurvey);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const survey = await service.update(
        { id: 'a uuid' },
        {
          surveyResponses: { connect: { id: 'surveyResponse id' } },
        }
      );
      expect(survey).toEqual(oneSurvey);
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
        .spyOn(prisma.survey, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
