import { InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { TagCreateInput } from './tag.create.input';

@InputType()
export class TagUpdateInput
  extends PartialType(TagCreateInput)
  implements Prisma.TagUpdateInput {}
