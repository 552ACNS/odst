import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '@prisma/client';
@ObjectType()
export class UserGQL implements User {
  @Field(() => String, { nullable: true })
  id: string;
  username: string;
  passwordHash: string;

  @Field(() => String)
  personId: string;
}
