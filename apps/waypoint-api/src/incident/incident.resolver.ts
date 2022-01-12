
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncidentCreateInput, IncidentGQL, IncidentWhereUniqueInput } from '@odst/types';
import { JwtAuthGUard } from '../auth/jwt.auth-guard';
import { IncidentService } from './incident.service';

@Resolver(() => IncidentGQL)
export class IncidentResolver {
  constructor(private readonly incidentService: IncidentService) {}

  @Mutation(() => IncidentGQL, { name: 'createIncident' })
  @UseGuards(JwtAuthGUard)
  async create(
    @Args('incidentCreateInput') incidentCreateInput: IncidentCreateInput,
  ) {
    return this.incidentService.create(incidentCreateInput);
  }


  @Query(() => IncidentGQL, { name: 'findUniqueIncident' })
  @UseGuards(JwtAuthGUard)
  async findUnique(
    @Args('incidentWhereUniqueInput')
    incidentWhereUniqueInput: IncidentWhereUniqueInput,
  ) {
    return this.incidentService.findUnique(incidentWhereUniqueInput);
  }

}
