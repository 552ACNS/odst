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
  TagCreateInput,
  TagWhereUniqueInput,
  SurveyResponse,
} from '@odst/types/ods';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [Tag], { name: 'findManyTags' })
  async findMany(): Promise<Tag[]> {
    return this.tagService.findMany({});
  }

  @Query(() => Tag, { name: 'findUniqueTag' })
  async findUnique(
    @Args('tagWhereUniqueInput')
    tagWhereUniqueInput: TagWhereUniqueInput
  ): Promise<Tag | null> {
    return this.tagService.findUnique(tagWhereUniqueInput);
  }

  @Mutation(() => Tag, { name: 'createTag' })
  create(@Args('tagCreateInput') tagCreateInput: TagCreateInput): Promise<Tag> {
    return this.tagService.create(tagCreateInput);
  }

  @ResolveField(() => [SurveyResponse])
  async surveyResponses(@Parent() tag: Tag): Promise<SurveyResponse[]> {
    return this.tagService.surveyResponses({ id: tag.id });
  }
}
