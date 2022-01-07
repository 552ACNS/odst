import { Test, TestingModule } from '@nestjs/testing';
import { OrgService } from '../org/org.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput, UserGQL } from '@odst/types';
import { UserResolver } from './User.resolver';
import { UserService } from './User.service';
import { TestUserCreateInput } from './User.repo';

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
    const resolvedUser: UserGQL = createdUser as unknown as UserGQL;

    // Change value of promise
    const result: Promise<UserGQL> = Promise.resolve(resolvedUser);

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

    const resolvedUsers: UserGQL[] = testUsers.map(
      (User) => User as unknown as UserGQL,
    );

    // Change value of promise
    const result: Promise<UserGQL[]> = Promise.resolve(resolvedUsers);

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
    const resolvedUser: UserGQL = userToFind as unknown as UserGQL;

    // Change value of promise
    const result: Promise<UserGQL> = Promise.resolve(resolvedUser);

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
    const newUsername = "new.username";
    //Create a GQL definition of the User to update
    const updatedUser: UserGQL = testUsers[2] as unknown as UserGQL;

    //Create a promised result that will match the User GQL data type that will be updated
    const result: Promise<UserGQL> = Promise.resolve(updatedUser);

    //Create the spy on the service
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the update service and get the actual to be compared to result
    const actual = await resolver.update({ username: updatedUser.username }, { username: newUsername });
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();
    //Determine if the actual and result are the same
    expect(actual).toEqual(updatedUser);
  });

  it('Should delete a User', async () => {
    // TEST PARAMS
    const methodToSpy = 'delete';
    //Create a GQL definition of the User to delete
    const deletedUser: UserGQL = testUsers[2] as unknown as UserGQL;

    //Create a promised result that will match the User GQL data type that will be deleted
    const result: Promise<UserGQL> = Promise.resolve(deletedUser);

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
