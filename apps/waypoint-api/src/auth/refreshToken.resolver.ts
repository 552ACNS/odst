import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RefreshTokenService } from './refreshToken.service';
import {
  RefreshTokenCreateInput,
  RefreshTokenUpdateInput,
  RefreshTokenGQL,
  RefreshTokenWhereUniqueInput,
} from '@odst/types';
import { JwtAuthGuard } from '../auth/jwt.auth-guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => RefreshTokenGQL)
export class RefreshTokenResolver {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}
  // create a refreshtoken
  @Mutation(() => RefreshTokenGQL, { name: 'createRefreshToken' })
  @UseGuards(JwtAuthGuard)
  async create(
    @Args('refreshTokenCreateInput')
    refreshTokenCreateInput: RefreshTokenCreateInput
  ) {
    return this.refreshTokenService.create(refreshTokenCreateInput);
  }
}
