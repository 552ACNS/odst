import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';
import { RefreshTokenGQL } from '../entity/refreshToken.entity';
import { RefreshTokenWhereUniqueInput } from './refreshToken.unique.input';
import { UserCreateNestedOneWithoutRefreshTokensInput } from './user.create.input';

@InputType()
export class RefreshTokenCreateInput implements Prisma.RefreshTokenCreateInput {
  isRevoked?: boolean;
  expires: Date;

  @Field(() => UserCreateNestedOneWithoutRefreshTokensInput)
  user: Prisma.UserCreateNestedOneWithoutRefreshTokensInput;
  hash: string;
}

@InputType()
export class RefreshTokenCreateNestedManyWithoutUserInput
  implements Prisma.RefreshTokenCreateNestedManyWithoutUserInput
{
  @Field(() => RefreshTokenWhereUniqueInput, { nullable: true })
  connect?: Prisma.RefreshTokenWhereUniqueInput;

  @Field(() => RefreshTokenCreateOrConnectWithoutUserInput, { nullable: true })
  connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutUserInput;
}

@InputType()
export class RefreshTokenCreateOrConnectWithoutUserInput
  implements Prisma.RefreshTokenCreateOrConnectWithoutUserInput
{
  @Field(() => RefreshTokenWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => RefreshTokenGQL)
  create: RefreshTokenGQL;
}
