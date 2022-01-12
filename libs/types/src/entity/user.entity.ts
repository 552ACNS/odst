import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
@InputType('UserGQLInput')
export class UserGQL {
  @Field(() => String, { nullable: true })
  id: string;
  username: string;

  @Field(() => String)
  personId: string;
}

