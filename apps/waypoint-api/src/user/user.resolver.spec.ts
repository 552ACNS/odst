import { Test, TestingModule } from '@nestjs/testing';
import { OrgService } from '../org/org.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput } from '@odst/types/waypoint';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TestUserCreateInput } from './user.repo';
import { User } from '.prisma/waypoint/client';

describe('UsersResolver', () => {
  let resolver: UserResolver;
  let servicer: UserService;

  const testUsers: UserCreateInput[] = TestUserCreateInput;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, PrismaService, OrgService],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    servicer = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call the method to create a User', async () => {
    // TEST PARAMS
    const createdUser: UserCreateInput = testUsers[0];
    const methodToSpy = 'create';

    // TODO: Seems awkward to cast the User here, but I don't know how to do it otherwise
    const resolvedUser: User = createdUser as unknown as User;

    // Change value of promise
    const result: Promise<User> = Promise.resolve(resolvedUser);

    //Make it so that the createUser method returns the fake User
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the createUser method by calling the controller
    const actual = await resolver.create(createdUser);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toBe(resolvedUser);
  });

  it('Should call the method to find all Users', async () => {
    // TEST PARAMS
    const methodToSpy = 'findMany';

    const resolvedUsers: User[] = testUsers.map(
      (User) => User as unknown as User
    );

    // Change value of promise
    const result: Promise<User[]> = Promise.resolve(resolvedUsers);

    //Make it so that the createUser method returns the fake User
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);
    // Call the createUser method by calling the controller
    const actual = await resolver.findMany();
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedUsers);
  });

  it('Should call the method to find a unique User', async () => {
    // TEST PARAMS
    const userToFind: UserCreateInput = testUsers[0];
    const methodToSpy = 'findUnique';

    // TODO: Seems awkward to cast the User here, but I don't know how to do it otherwise
    const resolvedUser: User = userToFind as unknown as User;

    // Change value of promise
    const result: Promise<User> = Promise.resolve(resolvedUser);

    //Make it so that the createUser method returns the fake User
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);
    // Call the createUser method by calling the controller
    const actual = await resolver.findUnique({ username: userToFind.username });
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedUser);
  });

  it('Should update a User', async () => {
    // TEST PARAMS
    const methodToSpy = 'update';
    const newUsername = 'new.username';
    //Create a GQL definition of the User to update
    const updatedUser: User = testUsers[2] as unknown as User;

    //Create a promised result that will match the User GQL data type that will be updated
    const result: Promise<User> = Promise.resolve(updatedUser);

    //Create the spy on the service
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the update service and get the actual to be compared to result
    const actual = await resolver.update(
      { username: updatedUser.username },
      { username: newUsername }
    );
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();
    //Determine if the actual and result are the same
    expect(actual).toEqual(updatedUser);
  });

  it('Should delete a User', async () => {
    // TEST PARAMS
    const methodToSpy = 'delete';
    //Create a GQL definition of the User to delete
    const deletedUser: User = testUsers[2] as unknown as User;

    //Create a promised result that will match the User GQL data type that will be deleted
    const result: Promise<User> = Promise.resolve(deletedUser);

    //Create the spy on the service
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the delete service and get the actual to be compared to result
    const actual = await resolver.delete({ username: deletedUser.username });
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();
    //Determine if the actual and result are the same
    expect(actual).toEqual(deletedUser);
  });
});
