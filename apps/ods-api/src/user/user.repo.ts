import { User, UserCreateInput } from '@odst/types/ods';

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

  {
    id: 'user id 2',
    email: 'email2',
    password: 'password2',
    role: 'ADMIN',
    enabled: false,
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
