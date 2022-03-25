import { QuestionCreateInput } from '@odst/types/ods';
import { Question } from '.prisma/ods/client';
import { cloneDeep } from '@apollo/client/utilities';

export const TestQuestionCreateInput: QuestionCreateInput[] = [
  {
    id: '1',
    prompt: 'Question 1',
    survey: {
      connect: {
        id: 'survey1',
      },
    },
  },
  {
    id: '2',
    prompt: 'Question 2',
    survey: {
      connect: {
        id: 'survey1',
      },
    },
  },
  {
    id: '3',
    prompt: 'Question 3',
    survey: {
      connect: {
        id: 'survey2',
      },
    },
  },
];

// Need to clone deep because of reference types. We delete the survey field
// from the mockQuestionInputs because the Question type does not have a survey
// field
export const mockQuestions: Question[] = cloneDeep(TestQuestionCreateInput).map(
  (questionInputs) => {
    delete questionInputs.survey;
    return questionInputs as Question;
  }
);
