import { FeedbackResponseCreateInput } from '@odst/types/ods';
import { FeedbackResponse } from '.prisma/ods/client';
import { User } from '.prisma/ods/client';
export const MockFeedbackResponses: FeedbackResponse[] = [
  {
    id: 'resolved response 1',
    openedDate: new Date(),
    closedDate: new Date(),
    feedbackId: 'feedbackId',
    routeOutside: false,
    resolved: true,
    reviewerId: 'user id 1',
  },
  {
    id: 'resolved response 2',
    openedDate: new Date(),
    closedDate: new Date(),
    feedbackId: 'feedbackId',
    routeOutside: false,
    resolved: true,
    reviewerId: 'user id 1',
  },
  //add condition for unresolved
  {
    id: 'unresolved response',
    openedDate: new Date(),
    closedDate: null,
    feedbackId: 'feedbackId',
    routeOutside: false,
    resolved: false,
    reviewerId: null,
  },
  //add condition for overdue
  {
    id: 'overdue response',
    openedDate: new Date(Date.now() - 2678400000),
    closedDate: null,
    feedbackId: 'feedbackId',
    routeOutside: false,
    resolved: false,
    reviewerId: null,
  },
];

export const MockFeedbackResponseCreateInput: FeedbackResponseCreateInput[] = [
  {
    feedback: { connect: { id: 'feedback id' } },
  },
];

export const MockUsers: User[] = [
  {
    id: 'user id 1',
    email: 'email',
    password: 'password',
    role: 'ADMIN',
    status: 'ENABLED',
    grade: 'grade',
    firstName: 'firstName',
    lastName: 'lastName',
  },
];
