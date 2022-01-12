import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
@InputType('UserGQLInput')
export class UserGQL {
  @Field(() => String, { nullable: true })
  id: string;
  username: string;

  @Field(() => String)
  personId: string;
}

