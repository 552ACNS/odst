import { SurveyCreateInput } from '@odst/types/ods';
import { Survey } from '.prisma/ods/client';

export const MockSurveys: Survey[] = [
  { id: 'survey id 1' },
  { id: 'survey id 2' },
];

export const MockSurveyCreateInput: SurveyCreateInput[] = [
  { orgs: { connect: { name: '552 ACW' } } },
  { orgs: { connect: { name: '552 ACNS' } } },
];
