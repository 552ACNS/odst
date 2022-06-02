import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TagService } from './tag.service';
import {
  Tag,
  // TagCreateInput,
  // TagWhereUniqueInput,
  //SurveyResponse,
} from '@odst/types/ods';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [String], { name: 'getTags' })
  async getTags(): Promise<string[]> {
    return this.tagService.getTags();
  }
}
