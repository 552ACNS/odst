import { Test, TestingModule } from '@nestjs/testing';
import { SurveyResponseResolver } from './surveyResponse.resolver';
import { SurveyResponseService } from './surveyResponse.service';
import { v4 as uuidv4 } from 'uuid';
import { TestSurveyResponseCreateInput } from './surveyResponse.repo';
import { SurveyResponseGQL } from '@odst/types/ods';

const surveyResponseArray: SurveyResponseGQL[] = [];

TestSurveyResponseCreateInput.forEach((surveyResponseCreateInput) => {
  const surveyResponse: SurveyResponseGQL = ((
    surveyResponseCreateInput as unknown as SurveyResponseGQL
  ).id = uuidv4());
  surveyResponseArray.push(surveyResponse);
});

const oneSurveyResponse = surveyResponseArray[0];

const arbitraryNumber = 3;

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
            findMany: jest.fn().mockResolvedValue(surveyResponseArray),
            findUnique: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneSurveyResponse)),
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneSurveyResponse)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(oneSurveyResponse)),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
            count: jest.fn().mockReturnValue(arbitraryNumber),
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

  describe('findUnique', () => {
    it('should get a single surveyResponse', async () => {
      await expect(
        resolver.findUnique({ id: 'a strange id' })
      ).resolves.toEqual(surveyResponseArray[0]);
      await expect(
        resolver.findUnique({ id: 'a different id' })
      ).resolves.toEqual(surveyResponseArray[0]);
    });
  });

  describe('create', () => {
    it('should create a create surveyResponse', async () => {
      await expect(
        resolver.create(TestSurveyResponseCreateInput[0])
      ).resolves.toEqual(surveyResponseArray[0]);
    });
  });

  describe('update', () => {
    it('should update a surveyResponse', async () => {
      await expect(
        resolver.update({ id: oneSurveyResponse.id }, { routeOutside: true })
      ).resolves.toEqual(oneSurveyResponse);
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

  describe('count', () => {
    it('should count surveyResponses', async () => {
      await expect(resolver.count({ routeOutside: false })).resolves.toEqual(
        arbitraryNumber
      );
    });
  });
});
