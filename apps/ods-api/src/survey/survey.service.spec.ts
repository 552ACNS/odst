import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyService } from './survey.service';
import { MockSurveyCreateInput, MockSurveys } from './survey.repo';

const db = {
  survey: {
    findMany: jest.fn().mockReturnValue(MockSurveys),
    findUnique: jest.fn().mockResolvedValue(MockSurveys[0]),
    create: jest.fn().mockResolvedValue(MockSurveys[0]),
    update: jest.fn().mockResolvedValue(MockSurveys[0]),
    delete: jest.fn().mockResolvedValue(MockSurveys[0]),
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
      expect(surveys).toEqual(MockSurveys);
    });
  });

  describe('findUnique', () => {
    it('should get a single survey', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(MockSurveys[0]);
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const survey = await service.create(MockSurveyCreateInput[0]);
      expect(survey).toEqual(MockSurveys[0]);
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
      expect(survey).toEqual(MockSurveys[0]);
    });
  });

  describe('delete', () => {
    it('should return {deleted: true}', () => {
      expect(service.delete({ id: 'a uuid' })).resolves.toEqual({
        deleted: true,
      });
    });

    it('should return {deleted: false, message: err.message}', () => {
      const dbSpy = jest
        .spyOn(prisma.survey, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
