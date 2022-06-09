import { Resolver, Query } from '@nestjs/graphql';
import { TagService } from './tag.service';
import {
  Tag,
  // TagCreateInput,
  // TagWhereUniqueInput,
  //FeedbackResponse,
} from '@odst/types/ods';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [String], { name: 'getTags' })
  async getTags(): Promise<string[]> {
    return this.tagService.getTags();
  }
}
