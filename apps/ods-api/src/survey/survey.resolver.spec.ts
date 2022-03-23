import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyResolver } from './survey.resolver';
import { SurveyService } from './survey.service';
import {
  SurveyCreateInput,
  SurveyGQL,
  SurveyUpdateInput,
} from '@odst/types/ods';
import { TestSurveyCreateInput } from './survey.repo';

describe('SurveyResolver', () => {
  let resolver: SurveyResolver;
  let servicer: SurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyResolver, SurveyService, PrismaService, SurveyService],
    }).compile();

    resolver = module.get<SurveyResolver>(SurveyResolver);
    servicer = module.get<SurveyService>(SurveyService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call the method to create an survey', async () => {
    // TEST PARAMS
    const createdSurvey: SurveyCreateInput = TestSurveyCreateInput[0];
    const methodToSpy = 'create';

    // TODO: Seems awkward to cast the survey here, but I don't know how to do it otherwise
    const resolvedSurvey: SurveyGQL = createdSurvey as unknown as SurveyGQL;

    // Change value of promise
    const result: Promise<SurveyGQL> = Promise.resolve(resolvedSurvey);

    //Make it so that the createSurvey method returns the fake survey
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the createSurvey method by calling the controller
    const actual = await resolver.create(createdSurvey);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toBe(resolvedSurvey);
  });

  it('should call the method to find all surveys', async () => {
    // TEST PARAMS
    const methodToSpy = 'surveys';

    const resolvedSurveys: SurveyGQL[] = TestSurveyCreateInput.map(
      (survey) => survey as unknown as SurveyGQL
    );

    // Change value of promise
    const result: Promise<SurveyGQL[]> = Promise.resolve(resolvedSurveys);

    //Make it so that the createSurvey method returns the fake survey
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the createSurvey method by calling the controller
    const actual = await resolver.findMany();
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedSurveys);
  });

  it('Should call the method to find a unique Survey', async () => {
    // TEST PARAMS
    const surveyToFind: SurveyCreateInput = TestSurveyCreateInput[0];
    const methodToSpy = 'findUnique';

    // TODO: Seems awkward to cast the Survey here, but I don't know how to do it otherwise
    const resolvedSurvey: SurveyGQL = surveyToFind as unknown as SurveyGQL;

    // Change value of promise
    const result: Promise<SurveyGQL> = Promise.resolve(resolvedSurvey);

    //Make it so that the createSurvey method returns the fake Survey
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);
    // Call the createSurvey method by calling the controller
    const actual = await resolver.findUnique({ id: surveyToFind.id });
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedSurvey);
  });

  it('should call the method to update an survey', async () => {
    // TEST PARAMS
    const originalSurvey: SurveyCreateInput = TestSurveyCreateInput[0];
    const updatedSurvey: SurveyUpdateInput = TestSurveyCreateInput[1];
    const methodToSpy = 'update';

    // TODO: Seems awkward to cast the survey here, but I don't know how to do it otherwise
    const resolvedSurvey: SurveyGQL = originalSurvey as unknown as SurveyGQL;

    // Change value of promise
    const result: Promise<SurveyGQL> = Promise.resolve(resolvedSurvey);

    //Make it so that the createSurvey method returns the fake survey
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the update method by calling the resolver
    const actual = await resolver.update(originalSurvey, updatedSurvey);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toBe(resolvedSurvey);
  });

  it('Should delete a Survey', async () => {
    // TEST PARAMS
    const methodToSpy = 'delete';
    //Create a GQL definition of the Survey to delete
    const deletedSurvey: SurveyGQL =
      TestSurveyCreateInput[2] as unknown as SurveyGQL;

    //Create a promised result that will match the Survey GQL data type that will be deleted
    const result: Promise<SurveyGQL> = Promise.resolve(deletedSurvey);

    //Create the spy on the service
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the delete service and get the actual to be compared to result
    const actual = await resolver.delete({ id: deletedSurvey.id });
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();
    //Determine if the actual and result are the same
    expect(actual).toEqual(deletedSurvey);
  });
});
