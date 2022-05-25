import { UserCreateInput, User } from '@odst/types/ods';

export const MockUsers: User[] = [
  {
    id: 'user id 1',
    email: 'email',
    password: 'password',
    role: 'ADMIN',
    enabled: true,
    grade: 'grade',
    firstName: 'firstName',
    lastName: 'lastName',
  },
];

export const MockUserCreateInput: UserCreateInput[] = [
  {
    email: 'email',
    password: 'password',
    role: 'ADMIN',
    enabled: true,
    grade: 'grade',
    firstName: 'firstName',
    lastName: 'lastName',
  },
];
