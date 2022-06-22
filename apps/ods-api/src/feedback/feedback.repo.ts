import { FeedbackCreateInput, Feedback } from '@odst/types/ods';

export const MockFeedbacks: Feedback[] = [
  { id: 'feedback id 1', questionsHash: 'aaa' },
  { id: 'feedback id 2', questionsHash: 'bbb' },
];

export const MockFeedbackCreateInput: FeedbackCreateInput[] = [
  { orgs: { connect: [{ name: '552 ACW' }] } },
  { orgs: { connect: [{ name: '552 ACNS' }] } },
];
