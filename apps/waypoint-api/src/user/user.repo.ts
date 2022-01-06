import { UserCreateInput } from '@odst/types';

export const TestUserCreateInput: UserCreateInput[] = [
  {
    username: "john.doe",
    passwordHash: "d4a2aa603c411106da8624b3c91ca636e8745c06986f6ddb06bcb077855c8ca5",
    person: {
      connect: {
        dodId: 123456789,
      },
    },
    previousPasswords: [],
  },
  {
    username: "johnny.toes",
    passwordHash: "f0f1658de325ca8a9359bc279059395d9da33065e5ac478cd54813ed64297cf1",
    person: {
      connect: {
        dodId: 987456789,
      },
    },
    previousPasswords: [],
  },
  {
    username: "tom.sawyer",
    passwordHash: "8532a96615ffc29017b4065cdbbc43598e4596194641aad601ec4d1ff790e2af",
    person: {
      connect: {
        dodId: 3269425899,
      },
    },
    previousPasswords: [],
  },
  {
    username: "imagine.ragon",
    passwordHash: "6adf72a358e9925a14dc5b2ac6e3623833571508b71191aa1f46c60eab6eea7d",
    person: {
      connect: {
        dodId: 5987654321,
      },
    },
    previousPasswords: [],
  },
];
