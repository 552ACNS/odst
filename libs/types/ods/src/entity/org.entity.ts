import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Org, OrgTier } from '.prisma/ods/client';
import { UserGQL } from './user.entity';

@ObjectType()
@InputType('OrgGQLInput')
export class OrgGQL implements Org {
  id: string;
  name: string;

  @Field(() => OrgTier)
  orgTier: OrgTier;
  parentId: string | null;
}
