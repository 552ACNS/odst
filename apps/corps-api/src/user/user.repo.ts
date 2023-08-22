import { User, UserCreateInput } from '@odst/types/corps';

export const MockUsers: User[] = [
  {
    id: 'user id 1',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
  }
];

export const MockUserCreateInput: UserCreateInput[] = [
  {
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
  },
];
