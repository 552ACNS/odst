import { QuestionCreateInput, Question } from '@odst/types/ods';

export const MockQuestions: Question[] = [
  {
    id: 'question id 1',
    value: 'valuey value',
  },
  {
    id: 'question id 2',
    value: 'tpmorp',
  },
];

export const MockQuestionCreateInput: QuestionCreateInput[] = [
  {
    value: 'Question 1',
    feedbacks: {
      connect: [
        {
          id: 'feedback1',
        },
      ],
    },
  },
  {
    value: 'Question 2',
    feedbacks: {
      connect: [
        {
          id: 'feedback1',
        },
      ],
    },
  },
  {
    value: 'Question 3',
    feedbacks: {
      connect: [
        {
          id: 'feedback2',
        },
      ],
    },
  },
];
