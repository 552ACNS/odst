import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { User } from '@prisma/client';
@ObjectType()
@InputType('UserGQLInput')
export class UserGQL implements User {
  @Field(() => String, { nullable: true })
  id: string;
  username: string;
  passwordHash: string;

  @Field(() => String)
  personId: string;
}
