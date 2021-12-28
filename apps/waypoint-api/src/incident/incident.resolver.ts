
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncidentCreateInput, IncidentGQL, IncidentWhereUniqueInput } from '@odst/types';
import { IncidentService } from './incident.service';

@Resolver(() => IncidentGQL)
export class IncidentResolver {
  constructor(private readonly incidentService: IncidentService) {}

  @Mutation(() => IncidentGQL, { name: 'createIncident' })
  async create(
    @Args('incidentCreateInput') incidentCreateInput: IncidentCreateInput,
  ) {
    return this.incidentService.create(incidentCreateInput);
  }

  
  @Query(() => IncidentGQL, { name: 'findUniqueIncident' })
  async findUnique(
    @Args('incidentWhereUniqueInput')
    incidentWhereUniqueInput: IncidentWhereUniqueInput,
  ) {
    return this.incidentService.findUnique(incidentWhereUniqueInput);
  }
  
}
