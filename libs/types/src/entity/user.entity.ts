import { ObjectType, Field, InputType, HideField } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
@InputType('UserGQLInput')
export class UserGQL implements User {

  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  personId: string;

  @Field(() => Boolean)
  enabled: boolean;

  @HideField()
  password: string;
}
