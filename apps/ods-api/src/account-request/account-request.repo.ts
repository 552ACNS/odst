import { AccountRequest } from '@odst/types/ods';

const date = new Date();
export const MockAccountRequests: AccountRequest[] = [
  {
    id: 'account request id 1',
    userId: 'user id 1',
    comments: [
      {
        id: 'comment id 1',
        value: 'comment text 1',
        authorId: 'user id 1',
        accountRequestId: 'account request id 1',
        date: date,
        feedbackResponseId: null,
      },
      {
        id: 'comment id 2',
        value: 'comment text 2',
        authorId: 'user id 1',
        accountRequestId: 'account request id 1',
        date: date,
        feedbackResponseId: null,
      },
    ],
  },
];
