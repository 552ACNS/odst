import { User, Prisma } from '.prisma/ods/client';

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

export const MockUserCreateInput: Prisma.UserCreateInput[] = [
  {
    email: 'validusername',
    password: '$2b$10$lYLvDW.qcmZhkpckBIst/.2jvC7rqD./U6MO0GFVVVlW52tlOkgWy',
    enabled: true,
    role: 'ADMIN',
    grade: 'grade',
    firstName: 'firstName',
    lastName: 'lastName',
  },
];
