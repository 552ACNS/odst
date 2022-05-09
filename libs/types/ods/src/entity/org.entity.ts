import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Org, OrgTier } from '.prisma/ods/client';

@ObjectType()
export class OrgGQL implements Org {
  id: string;
  name: string;

  @Field(() => OrgTier)
  orgTier: OrgTier;

  @HideField()
  parentId: string | null;
}
