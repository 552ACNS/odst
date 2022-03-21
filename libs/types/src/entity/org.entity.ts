import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Org, OrgTier } from '.prisma/waypoint/client';

@ObjectType()
@InputType('OrgGQLInput')
export class OrgGQL implements Org {
  @Field(() => String, { nullable: true })
  id: string;
  name: string;
  aliases: string[];

  @Field(() => OrgTier, { nullable: true })
  orgTier: OrgTier;

  @Field(() => String, { nullable: true })
  parentId: string | null;
}
