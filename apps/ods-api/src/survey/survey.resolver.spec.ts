import { Test, TestingModule } from '@nestjs/testing';
import { SurveyResolver } from './survey.resolver';
import { SurveyService } from './survey.service';
import { MockSurveyCreateInput, MockSurveys } from './survey.repo';

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
            findMany: jest.fn().mockResolvedValue(MockSurveys),
            findUnique: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockSurveys[0])),
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockSurveys[0])),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockSurveys[0])),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
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
      await expect(resolver.findMany()).resolves.toEqual(MockSurveys);
    });
  });

  describe('findUnqiue', () => {
    it('should get a single survey', async () => {
      await expect(
        resolver.findUnique({ id: 'a strange id' })
      ).resolves.toEqual(MockSurveys[0]);
      await expect(
        resolver.findUnique({ id: 'a different id' })
      ).resolves.toEqual(MockSurveys[0]);
    });
  });

  describe('create', () => {
    it('should create a create survey', async () => {
      await expect(resolver.create(MockSurveyCreateInput[0])).resolves.toEqual(
        MockSurveys[0]
      );
    });
  });

  describe('update', () => {
    it('should update a survey', async () => {
      await expect(
        resolver.update(
          { id: 'a uuid' },
          { surveyResponses: { connect: [{ id: 'surveyResponses id' }] } }
        )
      ).resolves.toEqual(MockSurveys[0]);
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
