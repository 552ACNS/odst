import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Org, OrgTier } from '.prisma/waypoint/client';

@ObjectType()
@InputType('OrgGQLInput')
export class OrgGQL implements Org {
  id: string;
  name: string;
  aliases: string[];

  @Field(() => OrgTier)
  orgTier: OrgTier;
  parentId: string | null;
}
