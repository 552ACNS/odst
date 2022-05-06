import { QuestionCreateInput, Question } from '../__types__/';

export const MockQuestions: Question[] = [
  {
    id: 'question id 1',
    prompt: 'prompty prompt',
  },
  {
    id: 'question id 2',
    prompt: 'tpmorp',
  },
];

export const MockQuestionCreateInput: QuestionCreateInput[] = [
  {
    prompt: 'Question 1',
    surveys: {
      connect: [
        {
          id: 'survey1',
        },
      ],
    },
  },
  {
    prompt: 'Question 2',
    surveys: {
      connect: [
        {
          id: 'survey1',
        },
      ],
    },
  },
  {
    prompt: 'Question 3',
    surveys: {
      connect: [
        {
          id: 'survey2',
        },
      ],
    },
  },
];
