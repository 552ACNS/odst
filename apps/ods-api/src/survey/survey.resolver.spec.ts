import { Test, TestingModule } from '@nestjs/testing';
import { SurveyResolver } from './survey.resolver';
import { SurveyService } from './survey.service';
import { v4 as uuidv4 } from 'uuid';
import { TestSurveyCreateInput } from './survey.repo';
import { TestQuestionCreateInput } from '../question/question.repo';
import { QuestionGQL, SurveyGQL } from '@odst/types/ods';
import { QuestionService } from '../question/question.service';

const surveyArray: SurveyGQL[] = [];

TestSurveyCreateInput.forEach((surveyCreateInput) => {
  const survey: SurveyGQL = ((surveyCreateInput as SurveyGQL).id = uuidv4());
  surveyArray.push(survey);
});

const oneSurvey = surveyArray[0];

const questionArray: QuestionGQL[] = [];

TestQuestionCreateInput.forEach((questionCreateInput) => {
  const question: QuestionGQL = ((questionCreateInput as QuestionGQL).id =
    uuidv4());
  questionArray.push(question);
});

describe('Survey Resolver', () => {
  let resolver: SurveyResolver;
  let service: SurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyResolver],
      providers: [
        {
          provide: SurveyService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(surveyArray),
            findUnique: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneSurvey)),
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneSurvey)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneSurvey)),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
        {
          provide: QuestionService,
          useValue: { findMany: jest.fn().mockResolvedValue(questionArray) },
        },
      ],
    }).compile();

    resolver = module.get<SurveyResolver>(SurveyResolver);
    service = module.get<SurveyService>(SurveyService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of surveys', async () => {
      await expect(resolver.findMany({})).resolves.toEqual(surveyArray);
    });
  });

  describe('findUnqiue', () => {
    it('should get a single survey', async () => {
      await expect(
        resolver.findUnique({ id: 'a strange id' })
      ).resolves.toEqual(surveyArray[0]);
      await expect(
        resolver.findUnique({ id: 'a different id' })
      ).resolves.toEqual(surveyArray[0]);
    });
  });

  describe('create', () => {
    it('should create a create survey', async () => {
      await expect(resolver.create(TestSurveyCreateInput[0])).resolves.toEqual(
        surveyArray[0]
      );
    });
  });

  describe('update', () => {
    it('should update a survey', async () => {
      await expect(
        resolver.update(
          { id: oneSurvey.id },
          { surveyResponses: { connect: { id: 'surveyResponses id' } } }
        )
      ).resolves.toEqual(oneSurvey);
    });
  });

  describe('delete', () => {
    it('should return that it deleted a survey', async () => {
      await expect(
        resolver.delete({ id: 'a uuid that exists' })
      ).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a survey', async () => {
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
