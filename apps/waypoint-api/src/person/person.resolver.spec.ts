import { Test, TestingModule } from '@nestjs/testing';
import { OrgService } from '../org/org.service';
import { PrismaService } from '../prisma/prisma.service';
import { PersonCreateInput, PersonGQL } from '@odst/types';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';
import { TestPersonCreateInput } from './person.repo';

describe('PersonsResolver', () => {
  let resolver: PersonResolver;
  let servicer: PersonService;

  const testPersons: PersonCreateInput[] = TestPersonCreateInput;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonResolver, PersonService, PrismaService, OrgService],
    }).compile();

    resolver = module.get<PersonResolver>(PersonResolver);
    servicer = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call the method to create a person', async () => {
    // TEST PARAMS
    const createdPerson: PersonCreateInput = testPersons[0];
    const methodToSpy = 'create';

    const resolvedPerson: PersonGQL = createdPerson as unknown as PersonGQL;

    // Change value of promise
    const result: Promise<PersonGQL> = Promise.resolve(resolvedPerson);

    //Make it so that the createPerson method returns the fake person
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the createPerson method by calling the controller
    const actual = await resolver.create(createdPerson);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toBe(resolvedPerson);
  });

  it('Should call the method to find all persons', async () => {
    // TEST PARAMS
    const methodToSpy = 'findMany';

    const resolvedPersons: PersonGQL[] = testPersons.map(
      (person) => person as unknown as PersonGQL
    );

    // Change value of promise
    const result: Promise<PersonGQL[]> = Promise.resolve(resolvedPersons);

    //Make it so that the createPerson method returns the fake person
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);
    // Call the createPerson method by calling the controller
    const actual = await resolver.findMany();
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedPersons);
  });

  it('Should call the method to find a unique Person', async () => {
    // TEST PARAMS
    const personToFind: PersonCreateInput = testPersons[0];
    const methodToSpy = 'findUnique';

    const resolvedPerson: PersonGQL = personToFind as unknown as PersonGQL;

    // Change value of promise
    const result: Promise<PersonGQL> = Promise.resolve(resolvedPerson);

    //Make it so that the createPerson method returns the fake Person
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);
    // Call the createPerson method by calling the controller
    const actual = await resolver.findUnique({ dodId: personToFind.dodId });
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedPerson);
  });

  it('Should return call the method that returns the people with the org id', async () => {
    // TEST PARAMS
    const methodToSpy = 'findManyInOrg';
    // const orgId = 'ck3q0xqj0cq0a0129x0x0x0x';

    //Take the mock data and map it to the PersonGQL type
    //Filter out the people that don't have the same birthCity
    const resolvedPersons: PersonGQL[] = testPersons
      .filter(
        (personInput) =>
          personInput.org?.connect?.id === 'ck3q0xqj0cq0a0129x0x0x0x'
      )
      .map((person) => person as unknown as PersonGQL);
    // Change value of promise
    const result: Promise<PersonGQL[]> = Promise.resolve(resolvedPersons);

    //Make it so that the createPerson method returns the fake people
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the createPerson method by calling the controller
    const actual = await resolver.findManyInOrg({ dodId: 12346789 });

    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedPersons);

    expect(actual).toHaveLength(7);
  });

  it('Should update a Person', async () => {
    // TEST PARAMS
    const methodToSpy = 'update';
    const newfirstName = 'new.firstName';
    //Create a GQL definition of the Person to update
    const updatedPerson: PersonGQL = testPersons[2] as unknown as PersonGQL;

    //Create a promised result that will match the Person GQL data type that will be updated
    const result: Promise<PersonGQL> = Promise.resolve(updatedPerson);

    //Create the spy on the service
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the update service and get the actual to be compared to result
    const actual = await resolver.update(
      { dodId: updatedPerson.dodId },
      { firstName: newfirstName }
    );
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();
    //Determine if the actual and result are the same
    expect(actual).toEqual(updatedPerson);
  });

  it('Should delete a person', async () => {
    // TEST PARAMS
    const methodToSpy = 'delete';
    const dodId = 123846789;
    //Create a GQL definition of the person to delete
    const deletedPerson: PersonGQL = testPersons[2] as unknown as PersonGQL;

    //Create a promised result that will match the person GQL data type that will be deleted
    const result: Promise<PersonGQL> = Promise.resolve(deletedPerson);

    //Create the spy on the service
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);

    // Call the delete service and get the actual to be compared to result
    const actual = await resolver.delete({ dodId: dodId });
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();
    //Determine if the actual and result are the same
    expect(actual).toEqual(deletedPerson);
  });
});
