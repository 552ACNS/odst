import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tokens {
  accessToken: string;
  refreshToken: string;
}
