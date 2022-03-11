import { Field, InputType } from '@nestjs/graphql';
import { OrgTier, Prisma } from '@prisma/client';

@InputType()
export class OrgWhereUniqueInput implements Prisma.OrgWhereUniqueInput {
  @Field(() => String, { nullable: true})
  id?: string;

  @Field(() => String, { nullable: true})
  name?: string;
}

//TODO not sure where to put this
@InputType()
export class OrgWhereInput implements Prisma.OrgWhereInput {
  id?: string;
  name?: string;

  @Field(() => OrgTier, { nullable: true})
  orgTier?: OrgTier;

  @Field(() => String, { nullable: true})
  parentId?: string;
}
