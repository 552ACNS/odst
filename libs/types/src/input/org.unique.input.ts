import { Field, InputType } from '@nestjs/graphql';
import { OrgTier, Prisma } from '@prisma/client';

@InputType()
export class OrgWhereUniqueInput implements Prisma.OrgWhereUniqueInput {

  @Field(() => String)
  id?: string;

  @Field(() => String)
  name?: string;
}

//TODO not sure where to put this
@InputType()
export class OrgWhereInput implements Prisma.OrgWhereInput {

  @Field(() => String)
  id?: string;

  @Field(() => String)
  name?: string;

  @Field(() => OrgTier)
  orgTier?: OrgTier;

  @Field(() => String)
  parentId?: string;
}
