import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TokensGQL {
  accessToken: string;
  refreshToken: string;
};
