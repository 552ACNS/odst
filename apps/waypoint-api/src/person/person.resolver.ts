import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { PersonCreateInput, PersonUpdateInput, PersonGQL, PersonWhereUniqueInput } from '@odst/types';
import { JwtAuthGuard } from '../auth/jwt.auth-guard';
import { UseGuards } from '@nestjs/common';


@Resolver(() => PersonGQL)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  // create a person
  @Mutation(() => PersonGQL, { name: 'createPerson' })
  // @UseGuards(JwtAuthGuard)
  async create(
    @Args('personCreateInput') personCreateInput: PersonCreateInput,
  ) {
    return this.personService.create(personCreateInput);
  }

  // find all persons
  @Query(() => [PersonGQL], { name: 'findManyPersons' })
  @UseGuards(JwtAuthGuard)
  async findMany() {
    return await this.personService.findMany();
  }

  @Query(() => PersonGQL, { name: 'findUniquePerson' })
  @UseGuards(JwtAuthGuard)
  async findUnique(
    @Args('personWhereUniqueInput')
    personWhereUniqueInput: PersonWhereUniqueInput,
  ) {
    return this.personService.findUnique(personWhereUniqueInput);
  }

  // find all persons in an org
  @Query(() => [PersonGQL], { name: 'findManyPersonsInOrg' })
  @UseGuards(JwtAuthGuard)
  async findManyInOrg(
    // TODO: REDO THIS After authentication is completed
    @Args('personWhereUniqueInput')
    personWhereUniqueInput: PersonWhereUniqueInput,
  ): Promise<PersonGQL[]> {
    return await this.personService.findManyInOrg(personWhereUniqueInput);
  }

  @Mutation(() => PersonGQL, { name: 'updatePerson' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Args('personWhereUniqueInput')
    personWhereUniqueInput: PersonWhereUniqueInput,
    @Args('PersonUpdateInput')
    personUpdateInput: PersonUpdateInput,
  ): Promise<PersonGQL> {
    return this.personService.update(personWhereUniqueInput, personUpdateInput);
  }

  @Mutation(() => PersonGQL, { name: 'deletePerson' })
  @UseGuards(JwtAuthGuard)
  async delete(
    @Args('personWhereUniqueInput')
    personWhereUniqueInput: PersonWhereUniqueInput,
  ): Promise<PersonGQL> {
    return this.personService.delete(personWhereUniqueInput);
  }
}
