import { SurveyResponseCreateInput } from '../__types__/';
import { SurveyResponse } from '.prisma/ods/client';
import { User } from '.prisma/ods/client';
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
  //add condition for unresolved
  {
    id: 'SurveyResponse id 3',
    openedDate: new Date(),
    closedDate: null,
    surveyId: 'surveyId',
    routeOutside: false,
    resolution: null,
  },
  //add condition for overdue
  {
    id: 'SurveyResponse id 4',
    openedDate: new Date(Date.now() - 2678400000),
    closedDate: null,
    surveyId: 'surveyId',
    routeOutside: false,
    resolution: null,
  },
];

export const MockSurveyResponseCreateInput: SurveyResponseCreateInput[] = [
  {
    survey: { connect: { id: 'survey id' } },
  },
];

export const MockUsers: User[] = [
  {
    id: 'user id 1',
    email: 'email',
    password: 'password',
    role: 'ADMIN',
    enabled: true,
    grade: 'grade',
    firstName: 'firstName',
    lastName: 'lastName',
  },
];
