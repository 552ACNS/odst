import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IncidentService } from './incident.service';
import {
  IncidentCreateInput,
  IncidentUpdateInput,
  IncidentGQL,
  IncidentWhereUniqueInput,
} from '@odst/types/waypoint';
import { UseGuards } from '@nestjs/common';
import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';

@Resolver(() => IncidentGQL)
export class IncidentResolver {
  constructor(private readonly incidentService: IncidentService) {}

  // find all incidents
  @Query(() => [IncidentGQL], { name: 'findManyIncidents' })
  @UseGuards(AccessTokenAuthGuard)
  async findMany(): Promise<IncidentGQL[]> {
    return this.incidentService.findMany({});
  }

  @Query(() => IncidentGQL, { name: 'findUniqueIncident' })
  @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('incidentWhereUniqueInput')
    incidentWhereUniqueInput: IncidentWhereUniqueInput
  ) {
    return this.incidentService.findUnique(incidentWhereUniqueInput);
  }

  // create a incident
  // ths uses the guard because to make an account while unauthenticated you use the signup mutation
  // password provided must be the hashed password for incident to be able to log in
  @Mutation(() => IncidentGQL, { name: 'createIncident' })
  @UseGuards(AccessTokenAuthGuard)
  async create(
    @Args('incidentCreateInput') incidentCreateInput: IncidentCreateInput
  ): Promise<IncidentGQL> {
    return await this.incidentService.create(incidentCreateInput);
  }

  @Mutation(() => IncidentGQL, { name: 'updateIncident' })
  @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('incidentWhereUniqueInput')
    incidentWhereUniqueInput: IncidentWhereUniqueInput,
    @Args('IncidentUpdateInput')
    incidentUpdateInput: IncidentUpdateInput
  ): Promise<IncidentGQL> {
    return (await this.incidentService.update(
      incidentWhereUniqueInput,
      incidentUpdateInput
    )) as IncidentGQL;
  }

  @Mutation(() => IncidentGQL, { name: 'deleteIncident' })
  @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('incidentWhereUniqueInput')
    incidentWhereUniqueInput: IncidentWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.incidentService.delete(incidentWhereUniqueInput);
  }
}
