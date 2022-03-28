import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonService } from './person.service';
import {
  PersonCreateInput,
  PersonUpdateInput,
  PersonGQL,
  PersonWhereUniqueInput,
} from '@odst/types/waypoint';
import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => PersonGQL)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  // create a person
  @Mutation(() => PersonGQL, { name: 'createPerson' })
  @UseGuards(AccessTokenAuthGuard)
  async create(
    @Args('personCreateInput') personCreateInput: PersonCreateInput
  ) {
    return this.personService.create(personCreateInput);
  }

  // find all persons
  @Query(() => [PersonGQL], { name: 'findManyPersons' })
  @UseGuards(AccessTokenAuthGuard)
  async findMany() {
    return await this.personService.findMany();
  }

  @Query(() => PersonGQL, { name: 'findUniquePerson' })
  @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('personWhereUniqueInput')
    personWhereUniqueInput: PersonWhereUniqueInput
  ) {
    return this.personService.findUnique(personWhereUniqueInput);
  }

  // find all persons in an org
  @Query(() => [PersonGQL], { name: 'findManyPersonsInOrg' })
  @UseGuards(AccessTokenAuthGuard)
  async findManyInOrg(
    // TODO: REDO THIS After authentication is completed
    @Args('personWhereUniqueInput')
    personWhereUniqueInput: PersonWhereUniqueInput
  ): Promise<PersonGQL[]> {
    return await this.personService.findManyInOrg(personWhereUniqueInput);
  }

  @Mutation(() => PersonGQL, { name: 'updatePerson' })
  @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('personWhereUniqueInput')
    personWhereUniqueInput: PersonWhereUniqueInput,
    @Args('PersonUpdateInput')
    personUpdateInput: PersonUpdateInput
  ): Promise<PersonGQL> {
    return this.personService.update(personWhereUniqueInput, personUpdateInput);
  }

  @Mutation(() => PersonGQL, { name: 'deletePerson' })
  @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('personWhereUniqueInput')
    personWhereUniqueInput: PersonWhereUniqueInput
  ): Promise<PersonGQL> {
    return this.personService.delete(personWhereUniqueInput);
  }
}
