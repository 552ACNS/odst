import { SurveyResponseCreateInput } from '@odst/types/ods';

export const TestSurveyResponseCreateInput: SurveyResponseCreateInput[] = [
  {
    survey: { connect: { id: 'survey id' } },
  },
];
