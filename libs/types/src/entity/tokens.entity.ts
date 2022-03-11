import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TokensGQL {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
};
