import { Test, TestingModule } from '@nestjs/testing';
import { SurveyResponseResolver } from './surveyResponse.resolver';
import { SurveyResponseService } from './surveyResponse.service';
import {
  MockSurveyResponses,
  MockSurveyResponseCreateInput,
} from './surveyResponse.repo';

describe('SurveyResponse Resolver', () => {
  let resolver: SurveyResponseResolver;
  let service: SurveyResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyResponseResolver],
      providers: [
        {
          provide: SurveyResponseService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(MockSurveyResponses),
            findUnique: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(MockSurveyResponses[0])
              ),
            create: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(MockSurveyResponses[0])
              ),
            update: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve(MockSurveyResponses[0])
              ),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    resolver = module.get<SurveyResponseResolver>(SurveyResponseResolver);
    service = module.get<SurveyResponseService>(SurveyResponseService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of surveyResponses', async () => {
      await expect(resolver.findMany({})).resolves.toEqual(MockSurveyResponses);
    });
  });

  describe('findUnique', () => {
    it('should get a single surveyResponse', async () => {
      await expect(
        resolver.findUnique({ id: 'a strange id' })
      ).resolves.toEqual(MockSurveyResponses[0]);
      await expect(
        resolver.findUnique({ id: 'a different id' })
      ).resolves.toEqual(MockSurveyResponses[0]);
    });
  });

  describe('create', () => {
    it('should create a create surveyResponse', async () => {
      await expect(
        resolver.create(MockSurveyResponseCreateInput[0])
      ).resolves.toEqual(MockSurveyResponses[0]);
    });
  });

  describe('update', () => {
    it('should update a surveyResponse', async () => {
      await expect(
        resolver.update(
          { id: MockSurveyResponses[0].id },
          { routeOutside: true }
        )
      ).resolves.toEqual(MockSurveyResponses[0]);
    });
  });

  describe('delete', () => {
    it('should return that it deleted a surveyResponse', async () => {
      await expect(
        resolver.delete({ id: 'a uuid that exists' })
      ).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a surveyResponse', async () => {
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
