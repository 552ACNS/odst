import { User } from '.prisma/waypoint/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { prismaMock } from '../prisma/singleton';
import { UserUpdateInput, UserWhereUniqueInput } from '@odst/types/waypoint';
import { TestUserCreateInput } from './user.repo';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should find a user', async () => {
    const userInput = TestUserCreateInput[0];
    const userWhereUniqueInput: UserWhereUniqueInput = {
      username: userInput.username,
    };

    const resolvedUser: User = userWhereUniqueInput as unknown as User;
    await service.findUnique(resolvedUser);

    expect(prismaMock.user.findUnique).toHaveBeenCalled();
  });

  it('Should create a new user', async () => {
    await service.create(TestUserCreateInput[0]);

    expect(prismaMock.user.create).toHaveBeenCalled();
  });

  it('Should find multiple people', async () => {
    await service.findMany();

    expect(prismaMock.user.findMany).toHaveBeenCalled();
  });

  it('Should find a unique user', async () => {
    const userInput: UserWhereUniqueInput = {
      username: TestUserCreateInput[0].username,
    };

    await service.findUnique(userInput.username as unknown as User);

    expect(prismaMock.user.findUnique).toHaveBeenCalled();
  });

  it('Should update a user', async () => {
    const userInput = TestUserCreateInput[0];
    const userWhereUniqueInput: UserWhereUniqueInput = {
      username: userInput.username,
    };
    const userUpdateInput: UserUpdateInput = {
      username: 'new.username',
    };

    await service.update(userWhereUniqueInput, userUpdateInput);

    expect(prismaMock.user.update).toHaveBeenCalled();
  });

  it('Should delete a user', async () => {
    const userInput = TestUserCreateInput[0];
    const userWhereUniqueInput: UserWhereUniqueInput = {
      username: userInput.username,
    };
    await service.delete(userWhereUniqueInput);
    //expect(result).toEqual(userInput as unknown as User);

    expect(prismaMock.user.delete).toHaveBeenCalled();
  });

  it('Should find a list of people skipiing 1, taking 3, with matching username', async () => {
    const userInput = TestUserCreateInput[3];
    const userWhereUniqueInput: UserWhereUniqueInput = {
      username: userInput.username,
    };

    const params = {
      skip: 1,
      take: 3,
      cursor: userWhereUniqueInput,
    };

    await service.users(params);

    expect(prismaMock.user.findMany).toHaveBeenCalled();
  });
});
