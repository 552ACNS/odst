import { Field, InputType } from '@nestjs/graphql';
import { OrgTier, Prisma } from '.prisma/waypoint/client';

@InputType()
export class OrgWhereUniqueInput implements Prisma.OrgWhereUniqueInput {
  id?: string;
  name?: string;
}

@InputType()
export class OrgWhereInput implements Prisma.OrgWhereInput {
  id?: string;
  name?: string;

  @Field(() => OrgTier)
  orgTier?: OrgTier;
  parentId?: string;
}
