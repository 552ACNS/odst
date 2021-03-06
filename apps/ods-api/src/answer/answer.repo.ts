import { AnswerCreateInput, Answer } from '@odst/types/ods';

export const MockAnswers: Answer[] = [
  {
    id: 'uuid 1',
    value: 'answer 1',
    feedbackResponseId: 'feedbackResponse id 1',
    questionId: 'question id 1',
  },
  {
    id: 'uuid 2',
    value: 'answer 2',
    feedbackResponseId: 'feedbackResponse id 2',
    questionId: 'question id 2',
  },
  {
    id: 'uuid 3',
    value: 'answer 3',
    feedbackResponseId: 'feedbackResponse id 3',
    questionId: 'question id 3',
  },
];

export const MockAnswerCreateInput: AnswerCreateInput[] = [
  {
    value: 'answer 1',
    feedbackResponse: {
      connect: {
        id: 'feedback 1',
      },
    },
    question: {
      connect: {
        id: 'question 1',
      },
    },
  },
];
