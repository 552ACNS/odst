import { Comment, Prisma } from '.prisma/ods/client';

export const MockComments: Comment[] = [
  {
    id: 'comment id',
    value: 'comment value',
    date: new Date(),
    authorId: 'author id',
    feedbackResponseId: 'feedback response id',
    accountRequestId: 'account request id',
  },
];

export const MockCommentCreateInput: Prisma.CommentCreateInput[] = [
  {
    value: 'comment value',
    date: new Date(),
    author: { connect: { id: 'author id' } },
    feedbackResponse: { connect: { id: 'feedback response id' } },
    accountRequest: { connect: { id: 'account request id' } },
  },
];
