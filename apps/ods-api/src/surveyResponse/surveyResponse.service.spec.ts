import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyResponseService } from './surveyResponse.service';
import { v4 as uuidv4 } from 'uuid';
import { TestSurveyResponseCreateInput } from './surveyResponse.repo';
import { SurveyResponse } from '.prisma/ods/client';
//TODO Fix the restricted imports please Cater
// eslint-disable-next-line no-restricted-imports
import { responseCount } from '@odst/types/ods';

const surveyResponseArray: SurveyResponse[] = [];

TestSurveyResponseCreateInput.forEach((surveyResponseCreateInput) => {
  const surveyResponse: SurveyResponse = ((
    surveyResponseCreateInput as unknown as SurveyResponse
  ).id = uuidv4());
  surveyResponseArray.push(surveyResponse);
});

const oneSurveyResponse = surveyResponseArray[0];

const mockResponseCount: responseCount = {
  unresolved: 7,
  overdue: 7,
  resolved: 7,
};

const db = {
  surveyResponse: {
    findMany: jest.fn().mockReturnValue(surveyResponseArray),
    findUnique: jest.fn().mockResolvedValue(oneSurveyResponse),
    create: jest.fn().mockResolvedValue(oneSurveyResponse),
    update: jest.fn().mockResolvedValue(oneSurveyResponse),
    delete: jest.fn().mockResolvedValue(oneSurveyResponse),
    count: jest.fn().mockReturnValue(mockResponseCount.unresolved),
  },
};

describe('SurveyResponseService', () => {
  let service: SurveyResponseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyResponseService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<SurveyResponseService>(SurveyResponseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of surveyResponses', async () => {
      const surveyResponses = await service.findMany({});
      expect(surveyResponses).toEqual(surveyResponseArray);
    });
  });

  describe('countResponses', () => {
    it('should get a number of surveyResponses', async () => {
      await expect(service.countResponses()).resolves.toEqual(
        mockResponseCount
      );
    });
  });

  describe('findUnique', () => {
    it('should get a single surveyResponse', async () => {
      await expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(
        oneSurveyResponse
      );
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const surveyResponse = await service.create(
        TestSurveyResponseCreateInput[0]
      );
      expect(surveyResponse).toEqual(oneSurveyResponse);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const surveyResponse = await service.update(
        { id: 'a uuid' },
        {
          survey: { connect: { id: 'survey id' } },
        }
      );
      expect(surveyResponse).toEqual(oneSurveyResponse);
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
        .spyOn(prisma.surveyResponse, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));

      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
