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
  TagGQL,
  TagCreateInput,
  TagWhereUniqueInput,
  SurveyResponseGQL,
} from '@odst/types/ods';

@Resolver(() => TagGQL)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [TagGQL], { name: 'findManyTags' })
  async findMany(): Promise<TagGQL[]> {
    return this.tagService.findMany({});
  }

  @Query(() => TagGQL, { name: 'findUniqueTag' })
  async findUnique(
    @Args('tagWhereUniqueInput')
    tagWhereUniqueInput: TagWhereUniqueInput
  ): Promise<TagGQL | null> {
    return this.tagService.findUnique(tagWhereUniqueInput);
  }

  @Mutation(() => TagGQL, { name: 'createTag' })
  create(
    @Args('tagCreateInput') tagCreateInput: TagCreateInput
  ): Promise<TagGQL> {
    return this.tagService.create(tagCreateInput);
  }

  @ResolveField(() => [SurveyResponseGQL])
  async surveyResponses(@Parent() tag: TagGQL): Promise<SurveyResponseGQL[]> {
    return this.tagService.surveyResponses({ id: tag.id });
  }
}
