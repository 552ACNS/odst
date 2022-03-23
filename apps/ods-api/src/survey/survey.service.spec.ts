import { Test, TestingModule } from '@nestjs/testing';
import { Survey } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import { TestSurveyCreateInput } from './survey.repo';
import { SurveyService } from './survey.service';
import { prismaMock } from '../prisma/singleton';
import {
  SurveyWhereUniqueInput,
  SurveyUpdateInput,
} from '@odst/types/ods';

describe('SurveyService', () => {
  let service: SurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<SurveyService>(SurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should find an survey', async () => {
    const surveyInput = TestSurveyCreateInput[0];
    const surveyWhereUniqueInput: SurveyWhereUniqueInput = {
      id: surveyInput.id,
    };

    await service.findUnique(surveyWhereUniqueInput);

    expect(prismaMock.survey.findUnique).toHaveBeenCalled();
  });

  it('Should create a new survey', async () => {
    await service.create(TestSurveyCreateInput[0]);
    expect(prismaMock.survey.create).toHaveBeenCalled();
  });

  it('Should find multiple people', async () => {
    await service.findMany();

    expect(prismaMock.survey.findMany).toHaveBeenCalled();
  });

  it('Should find a unique survey', async () => {
    const surveyInput: SurveyWhereUniqueInput = {
      id: TestSurveyCreateInput[0].id,
    };
    await service.findUnique(surveyInput.id as unknown as Survey);

    expect(prismaMock.survey.findUnique).toHaveBeenCalled();
  });

  it('Should update a survey', async () => {
    const surveyInput = TestSurveyCreateInput[0];
    const surveyWhereUniqueInput: SurveyWhereUniqueInput = {
      id: surveyInput.id,
    };
    const surveyUpdateInput: SurveyUpdateInput = {
      orgs: { connect : { id: "org-id"}},
    };

    await service.update(surveyWhereUniqueInput, surveyUpdateInput);
    expect(prismaMock.survey.update).toHaveBeenCalled();
  });

  it('Should delete a survey', async () => {
    const surveyInput = TestSurveyCreateInput[0];
    const surveyWhereUniqueInput: SurveyWhereUniqueInput = {
      id: surveyInput.id,
    };
    await service.delete(surveyWhereUniqueInput);
    //expect(result).toEqual(surveyInput as unknown as Survey);

    expect(prismaMock.survey.delete).toHaveBeenCalled();
  });

  it('Should find all surveys that are a sub survey to the given survey', async () => {
    TestSurveyCreateInput.forEach((surveyCreateInput) =>
      service.create(surveyCreateInput)
    );

    const surveyInput: SurveyWhereUniqueInput = {
      id: TestSurveyCreateInput[0].id,
    };

    await service.findUnique(surveyInput.id as unknown as Survey);
    await service.getSubSurveys(surveyInput);

    expect(prismaMock.survey.findUnique).toHaveBeenCalled();
    //expect(prismaMock.survey.findMany).toHaveBeenCalled();

    // TODO test the second half ot getSubSurveys method.
    // Right now, only the part where no sub surveys exist is tested
  });

  it('Should find a list of people skipiing 1, taking 3, with matching id', async () => {
    const surveyInput = TestSurveyCreateInput[3];
    const surveyWhereUniqueInput: SurveyWhereUniqueInput = {
      id: surveyInput.id,
    };

    const params = {
      skip: 1,
      take: 3,
      cursor: surveyWhereUniqueInput,
    };

    await service.surveys(params);

    expect(prismaMock.survey.findMany).toHaveBeenCalled();
  });
});
