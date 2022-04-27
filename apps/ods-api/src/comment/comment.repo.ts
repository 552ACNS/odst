import { Comment, Prisma } from '.prisma/ods/client';

export const MockComments: Comment[] = [
  {
    id: 'comment id',
    value: 'comment value',
    date: new Date(),
    authorId: 'author id',
    surveyResponseId: 'survey response id',
  },
];

export const MockCommentCreateInput: Prisma.CommentCreateInput[] = [
  {
    value: 'comment value',
    date: new Date(),
    author: { connect: { id: 'author id' } },
    SurveyResponse: { connect: { id: 'survey response id' } },
  },
];
