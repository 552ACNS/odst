import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyResponseService } from './surveyResponse.service';
import { v4 as uuidv4 } from 'uuid';
import {
  MockSurveyResponseCreateInput,
  MockSurveyResponses,
} from './surveyResponse.repo';
import { SurveyResponseGQL } from '@odst/types/ods';

const db = {
  surveyResponse: {
    findMany: jest.fn().mockReturnValue(MockSurveyResponses),
    findUnique: jest.fn().mockResolvedValue(MockSurveyResponses[0]),
    create: jest.fn().mockResolvedValue(MockSurveyResponses[0]),
    update: jest.fn().mockResolvedValue(MockSurveyResponses[0]),
    delete: jest.fn().mockResolvedValue(MockSurveyResponses[0]),
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
      expect(surveyResponses).toEqual(MockSurveyResponses);
    });
  });

  describe('findUnique', () => {
    it('should get a single surveyResponse', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(
        MockSurveyResponses[0]
      );
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const surveyResponse = await service.create(
        MockSurveyResponseCreateInput[0]
      );
      expect(surveyResponse).toEqual(MockSurveyResponses[0]);
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
      expect(surveyResponse).toEqual(MockSurveyResponses[0]);
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
