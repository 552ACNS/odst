import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Org, OrgTier } from '.prisma/ods/client';

@ObjectType()
@InputType('OrgGQLInput')
export class OrgGQL implements Org {
  @Field(() => String, { nullable: true })
  id: string;
  name: string;

  @Field(() => OrgTier)
  orgTier: OrgTier;
  parentId: string | null;
}
