import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RefreshTokenGQL } from '../entity/refreshToken.entity';
import { UserGQL } from '../entity/user.entity'
import { RefreshTokenWhereUniqueInput } from './refreshToken.unique.input';

@InputType()
export class RefreshTokenCreateInput {
  @Field()
  isRevoked: boolean

  @Field()
  expires: Date

  @Field(() => UserGQL)
  user: UserGQL;

  token: string
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
