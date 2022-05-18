import { ObjectType } from '@nestjs/graphql';
import { Tag } from '.prisma/ods/client';

@ObjectType()
export class TagGQL implements Tag {
  id: string;
  value: string;
}
