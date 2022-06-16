import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { FeedbackResponseService } from './feedbackResponse.service';
import {
  MockFeedbackResponseCreateInput,
  MockFeedbackResponses,
  MockUsers,
} from './feedbackResponse.repo';
import { User } from '@odst/types/ods';
import { MockOrgs } from '../org/org.repo';

const db = {
  feedbackResponse: {
    findMany: jest.fn().mockResolvedValue(MockFeedbackResponses),
    findUnique: jest.fn().mockResolvedValue(MockFeedbackResponses[0]),
    create: jest.fn().mockResolvedValue(MockFeedbackResponses[0]),
    update: jest.fn().mockResolvedValue(MockFeedbackResponses[0]),
    delete: jest.fn().mockResolvedValue(MockFeedbackResponses[0]),
  },
  // Org is used to find the orgs that the user can see
  org: {
    findMany: jest.fn().mockResolvedValue(MockOrgs),
  },
};

describe('FeedbackResponseService', () => {
  let service: FeedbackResponseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackResponseService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<FeedbackResponseService>(FeedbackResponseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return a list of responses', async () => {
      const feedbackResponses = await service.findMany(new User(), {
        where: {},
      });
      expect(feedbackResponses).toEqual(MockFeedbackResponses);
    });

    it('should call the restrictor', async () => {
      const spy = jest.spyOn(service, 'restrictor');

      await service.findMany(new User(), { where: {} });

      expect(spy).toBeCalled();
    });
  });

  describe('findUnique', () => {
    it('should get a single feedbackResponse', async () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(
        MockFeedbackResponses[0]
      );
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const feedbackResponse = await service.create(
        MockFeedbackResponseCreateInput[0]
      );
      expect(feedbackResponse).toEqual(MockFeedbackResponses[0]);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const feedbackResponse = await service.update(
        { id: 'a uuid' },
        MockFeedbackResponseCreateInput[0]
      );
      expect(feedbackResponse).toEqual(MockFeedbackResponses[0]);
    });
  });

  describe('delete', () => {
    it('should return {deleted: true}', async () => {
      await expect(service.delete({ id: 'a uuid' })).resolves.toEqual({
        deleted: true,
      });
    });

    it('should return {deleted: false, message: err.message}', async () => {
      jest
        .spyOn(prisma.feedbackResponse, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));

      await expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });

  describe('determine status', () => {
    it('should return an overdue status condition check', async () => {
      const feedbackResponse = service.determineStatus('overdue');
      expect(feedbackResponse.resolved).toEqual(false);
      expect(feedbackResponse.openedDate).toBeDefined();
    });
    it('should return an unresolved status condition check', async () => {
      const feedbackResponse = service.determineStatus('unresolved');
      expect(feedbackResponse.resolved).toEqual(false);
      expect(feedbackResponse.openedDate).toBeUndefined();
    });
    it('should return a resolved status condition check', async () => {
      const feedbackResponse = service.determineStatus('resolved');
      expect(feedbackResponse.resolved).toEqual(true);
    });
  });

  describe('return issues by status', () => {
    it('should return reports that are resolved', async () => {
      // return a json body of string IDs
      jest
        .spyOn(prisma.feedbackResponse, 'findMany')
        .mockResolvedValue(MockFeedbackResponses.filter((x) => !!x.resolved));

      const feedbackResponse = await service.getIssuesByStatus(
        'resolved',
        MockUsers[0],
        0,
        2
      );

      expect(feedbackResponse).toHaveLength(2);
      expect(feedbackResponse[0]).toBe(MockFeedbackResponses[0]);
      expect(feedbackResponse[1]).toBe(MockFeedbackResponses[1]);
    });

    it('should return reports that are unresolved', async () => {
      // return a json body of string IDs
      jest
        .spyOn(prisma.feedbackResponse, 'findMany')
        .mockResolvedValue(MockFeedbackResponses.filter((x) => !x.resolved));

      const feedbackResponse = await service.getIssuesByStatus(
        'unresolved',
        MockUsers[0],
        0,
        1
      );

      expect(feedbackResponse).toHaveLength(2);
      expect(feedbackResponse[0]).toBe(MockFeedbackResponses[2]);
    });

    it('should return reports that are overdue', async () => {
      const compareDate = new Date(Date.now() - 2592000000);
      // return a json body of string IDs
      jest
        .spyOn(prisma.feedbackResponse, 'findMany')
        .mockResolvedValue(
          MockFeedbackResponses.filter((x) => x.openedDate < compareDate)
        );

      const feedbackResponse = await service.getIssuesByStatus(
        'overdue',
        MockUsers[0],
        0,
        1
      );

      expect(feedbackResponse).toHaveLength(1);
      expect(feedbackResponse[0]).toBe(MockFeedbackResponses[3]);
    });

    it('should return reports using unresolved status', async () => {
      const spy = jest.spyOn(prisma.feedbackResponse, 'findMany');

      await service.getIssuesByStatus('unresolved', MockUsers[0], 0, 1);

      expect(spy).toHaveBeenCalledWith({
        where: {
          resolved: false,
        },
        skip: 0,
        take: 1,
        orderBy: {
          openedDate: 'desc',
        },
      });
    });

    it('should return reports using resolved status', async () => {
      const spy = jest.spyOn(prisma.feedbackResponse, 'findMany');

      await service.getIssuesByStatus('resolved', MockUsers[0], 0, 1);

      expect(spy).toHaveBeenCalledWith({
        where: {
          resolved: true,
        },
        skip: 0,
        take: 1,
        orderBy: {
          openedDate: 'desc',
        },
      });
    });
  });
});
