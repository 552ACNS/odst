import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyResponseService } from './surveyResponse.service';
import {
  MockSurveyResponseCreateInput,
  MockSurveyResponses,
} from './surveyResponse.repo';

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

  describe('determine status', () => {
    it('should return an overdue status condition check', () => {
      const surveyResponse = service.determineStatus('overdue');
      expect(surveyResponse.resolution).toEqual(null);
      expect(surveyResponse.openedDate).toBeDefined();
    });
    it('should return an unresolved status condition check', () => {
      const surveyResponse = service.determineStatus('unresolved');
      expect(surveyResponse.resolution).toEqual(null);
      expect(surveyResponse.openedDate).toBeUndefined();
    });
    it('should return a resolved status condition check', () => {
      const surveyResponse = service.determineStatus('resolved');
      expect(surveyResponse.resolution).toEqual({ not: null });
    });
  });

  describe('return issues by status', () => {
    it('should return reports that are resolved', async () => {
      // return a json body of string IDs
      jest
        .spyOn(prisma.surveyResponse, 'findMany')
        .mockResolvedValue(MockSurveyResponses.filter((x) => !!x.resolution));

      const surveyResponse = await service.getIssuesByStatus('resolved');

      expect(surveyResponse).toHaveLength(2);
      expect(surveyResponse[0]).toBe('SurveyResponse id 1');
      expect(surveyResponse[1]).toBe('SurveyResponse id 2');
    });
    it('should return reports that are unresolved', async () => {
      // return a json body of string IDs
      jest
        .spyOn(prisma.surveyResponse, 'findMany')
        .mockResolvedValue(MockSurveyResponses.filter((x) => !x.resolution));

      const surveyResponse = await service.getIssuesByStatus('unresolved');

      expect(surveyResponse).toHaveLength(2);
      expect(surveyResponse[0]).toBe('SurveyResponse id 3');
      expect(surveyResponse[1]).toBe('SurveyResponse id 4');
    });

    it('should return reports that are overdue', async () => {
      const compareDate = new Date(Date.now() - 2592000000);
      // return a json body of string IDs
      jest
        .spyOn(prisma.surveyResponse, 'findMany')
        .mockResolvedValue(
          MockSurveyResponses.filter((x) => x.openedDate < compareDate)
        );

      const surveyResponse = await service.getIssuesByStatus('overdue');

      expect(surveyResponse).toHaveLength(1);
      expect(surveyResponse[0]).toBe('SurveyResponse id 4');
    });

    it('should return reports using unresolved status', async () => {
      const spy = jest.spyOn(prisma.surveyResponse, 'findMany');

      await service.getIssuesByStatus('unresolved');

      expect(spy).toHaveBeenCalledWith({
        where: {
          resolution: null,
        },
        select: {
          id: true,
        },
        orderBy: {
          openedDate: 'asc',
        },
      });
    });

    it('should return reports using resolved status', async () => {
      const spy = jest.spyOn(prisma.surveyResponse, 'findMany');

      await service.getIssuesByStatus('resolved');

      expect(spy).toHaveBeenCalledWith({
        where: {
          resolution: { not: null },
        },
        select: {
          id: true,
        },
        orderBy: {
          openedDate: 'asc',
        },
      });
    });

    it('should return reports using overdue status', async () => {
      const spy = jest.spyOn(prisma.surveyResponse, 'findMany');

      await service.getIssuesByStatus('overdue');

      expect(spy).toHaveBeenCalledWith({
        where: {
          openedDate: {
            lt: new Date(Date.now() - 2592000000),
          },
          resolution: null,
        },
        select: {
          id: true,
        },
        orderBy: {
          openedDate: 'asc',
        },
      });
    });
  });
});
