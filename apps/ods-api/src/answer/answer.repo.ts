import { AnswerCreateInput } from '@odst/types/ods';

export const TestAnswerCreateInput: AnswerCreateInput[] = [
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
  {
    value: 'answer 2',
    surveyResponse: {
      connect: {
        id: 'survey 2',
      },
    },
    question: {
      connect: {
        id: 'question 2',
      },
    },
  },
  {
    value: 'answer 3',
    surveyResponse: {
      connect: {
        id: 'survey 3',
      },
    },
    question: {
      connect: {
        id: 'question 3',
      },
    },
  },
];
