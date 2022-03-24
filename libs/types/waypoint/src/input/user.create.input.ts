import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';
import { PersonCreateNestedOneWithoutUserInput } from './person.create.input';
import { RefreshTokenCreateNestedManyWithoutUserInput } from './refreshToken.create.input';
import { UserWhereUniqueInput } from './user.unique.input';
import { UserGQL } from '../entity/user.entity';

@InputType()
export class UserCreateInput implements Prisma.UserCreateInput {
  username: string;
  password: string;

  @Field(() => PersonCreateNestedOneWithoutUserInput)
  person!: Prisma.PersonCreateNestedOneWithoutUserInput;

  enabled?: boolean;

  @Field(() => RefreshTokenCreateNestedManyWithoutUserInput)
  refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
}


@InputType()
export class UserCreateNestedOneWithoutRefreshTokensInput
  implements Prisma.UserCreateNestedOneWithoutRefreshTokensInput
{
  @Field(() => UserWhereUniqueInput, { nullable: true })
  connect?: Prisma.UserWhereUniqueInput;

  @Field(() => UserCreateOrConnectWithoutRefreshTokensInput, { nullable: true })
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshTokensInput;
}

@InputType()
export class UserCreateOrConnectWithoutRefreshTokensInput
  implements Prisma.UserCreateOrConnectWithoutRefreshTokensInput
{
  @Field(() => UserWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => UserGQL)
  create: UserGQL;
}
