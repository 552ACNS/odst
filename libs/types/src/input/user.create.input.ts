import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';
import { PersonCreateNestedOneWithoutUserInput } from './person.create.input';
import { RefreshTokenCreateNestedManyWithoutUserInput } from './refreshToken.create.input';

@InputType()
export class UserCreateInput implements Prisma.UserCreateInput {
  username: string;
  password: string;

  @Field(() => PersonCreateNestedOneWithoutUserInput)
  person!: Prisma.PersonCreateNestedOneWithoutUserInput;

  @Field(() => Boolean)
  enabled?: boolean;

  @Field(() => RefreshTokenCreateNestedManyWithoutUserInput)
  refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
}
