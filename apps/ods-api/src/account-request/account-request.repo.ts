import { AccountRequest } from '.prisma/ods/client';
import { AccountRequestCreateInput } from '@odst/types/ods';

export const MockAccountRequests: AccountRequest[] = [
  {
    id: 'account request id 1',
    email: 'valid email',
    grade: 'O-5',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    date: new Date(),
    role: 'ADMIN',
    approverId: null,
    denied: false,
  },
  {
    id: 'account request id 2',
    email: 'valid email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    date: new Date(),
    role: 'ADMIN',
    approverId: null,
    denied: false,
    grade: null,
  },
];

export const MockAccountRequestCreateInput: AccountRequestCreateInput[] = [
  {
    email: 'valid email',
    grade: 'O-5',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'ADMIN',
    orgs: {
      connect: {
        name: '552 ACNS',
      },
    },
  },
  {
    email: 'valid email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'ADMIN',
    grade: undefined,
    orgs: {},
  },
];
