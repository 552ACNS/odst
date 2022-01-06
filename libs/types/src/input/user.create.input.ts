import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';
import {  PersonCreateNestedOneWithoutUserInput } from './person.create.input'
import { UserGQL } from '../entity/user.entity';
import { UserWhereUniqueInput } from './user.unique.input';

@InputType()
export class UserCreateWithoutPersonInput implements Prisma.UserCreateWithoutPersonInput {
  username: string;
  passwordHash: string;
  previousPasswords: string[];
}

@InputType()
export class UserCreateInput
  extends UserCreateWithoutPersonInput
  implements Prisma.UserCreateInput
{
  @Field(() => PersonCreateNestedOneWithoutUserInput)
  person!: Prisma.PersonCreateNestedOneWithoutUserInput;
}

@InputType()
export class UserCreateNestedOneWithoutPersonInput
  implements Prisma.UserCreateNestedOneWithoutPersonInput
{
  @Field(() => UserWhereUniqueInput, { nullable: true })
  connect?: Prisma.UserWhereUniqueInput;

  @Field(() => UserGQL, { nullable: true })
  create?: Prisma.UserCreateWithoutPersonInput;

  @Field(() => UserCreateOrConnectWithoutPersonInput, { nullable: true })
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutPersonInput;
}

@InputType()
export class UserCreateOrConnectWithoutPersonInput
  implements Prisma.UserCreateOrConnectWithoutPersonInput
{
  @Field(() => UserWhereUniqueInput)
  where: Prisma.UserWhereUniqueInput;

  @Field(() => UserGQL)
  create: UserGQL;
}
