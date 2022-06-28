import { Resolver, Query } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Tag } from '@odst/types/ods';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [Tag], { name: 'getTags' })
  async getTags(): Promise<Tag[]> {
    return this.tagService.getTags();
  }
}
