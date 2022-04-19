import { SurveyResponseCreateInput } from '@odst/types/ods';
import { SurveyResponse } from '.prisma/ods/client';

export const MockSurveyResponses: SurveyResponse[] = [
  {
    id: 'SurveyResponse id 1',
    openedDate: new Date(),
    closedDate: new Date(),
    surveyId: 'surveyId',
    routeOutside: false,
    resolution: 'resolved',
  },
  {
    id: 'SurveyResponse id 2',
    openedDate: new Date(),
    closedDate: new Date(),
    surveyId: 'surveyId',
    routeOutside: false,
    resolution: 'resolved',
  },
];

export const MockSurveyResponseCreateInput: SurveyResponseCreateInput[] = [
  {
    survey: { connect: { id: 'survey id' } },
  },
];
