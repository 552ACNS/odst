import { UserCreateInput } from '@odst/types/waypoint';
import { User } from '.prisma/ods/client';

export const MockUsers: User[] = [
  {
    id: 'user id 1',
    email: 'email',
    password: 'password',
    role: 'ADMIN',
    enabled: true,
    grade: 'rank',
    firstName: 'firstName',
    lastName: 'lastName',
  },
];

export const MockUserCreateInput: UserCreateInput[] = [
  {
    username: 'validusername',
    password: '$2b$10$lYLvDW.qcmZhkpckBIst/.2jvC7rqD./U6MO0GFVVVlW52tlOkgWy',
    person: {
      connect: {
        dodId: 123456789,
      },
    },
    enabled: true,
  },
  {
    username: 'johnny.toes',
    password:
      'f0f1658de325ca8a9359bc279059395d9da33065e5ac478cd54813ed64297cf1',
    person: {
      connect: {
        dodId: 987456789,
      },
    },
    enabled: true,
  },
  {
    username: 'tom.sawyer',
    password:
      '8532a96615ffc29017b4065cdbbc43598e4596194641aad601ec4d1ff790e2af',
    person: {
      connect: {
        dodId: 3269425899,
      },
    },
    enabled: true,
  },
  {
    username: 'imagine.ragon',
    password:
      '6adf72a358e9925a14dc5b2ac6e3623833571508b71191aa1f46c60eab6eea7d',
    person: {
      connect: {
        dodId: 5987654321,
      },
    },
    enabled: true,
  },
];
