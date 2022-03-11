import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Org, OrgTier } from '@prisma/client';

@ObjectType()
@InputType('OrgGQLInput')
export class OrgGQL implements Org {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  aliases: string[];

  @Field(() => OrgTier, { nullable: true })
  orgTier: OrgTier;

  @Field(() => String, { nullable: true })
  parentId: string | null;
}
