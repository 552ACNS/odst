import { Answer, AnswerCreateInput } from '@odst/types/ods';

export const MockAnswers: Answer[] = [
  {
    id: 'uuid 1',
    value: 'answer 1',
    surveyResponseId: 'surveyResponse id 1',
    questionId: 'question id 1',
  },
  {
    id: 'uuid 2',
    value: 'answer 2',
    surveyResponseId: 'surveyResponse id 2',
    questionId: 'question id 2',
  },
  {
    id: 'uuid 3',
    value: 'answer 3',
    surveyResponseId: 'surveyResponse id 3',
    questionId: 'question id 3',
  },
];

export const MockAnswerCreateInput: AnswerCreateInput[] = [
  {
    value: 'answer 1',
    surveyResponse: {
      connect: {
        id: 'survey 1',
      },
    },
    question: {
      connect: {
        id: 'question 1',
      },
    },
  },
];
