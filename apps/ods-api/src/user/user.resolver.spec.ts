import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { TestUserCreateInput } from './user.repo';
import { UserGQL } from '@odst/types/ods';

const userArray: UserGQL[] = [];

TestUserCreateInput.forEach((userCreateInput) => {
  const user: UserGQL = ((userCreateInput as unknown as UserGQL).id = uuidv4());
  userArray.push(user);
});

const oneUser = userArray[0];

describe('User Resolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResolver],
      providers: [
        {
          provide: UserService,
          useValue: {
            findMany: jest.fn().mockResolvedValue(userArray),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findMany', () => {
    it('should get an array of users', async () => {
      await expect(resolver.findMany({})).resolves.toEqual(userArray);
    });
  });
});
