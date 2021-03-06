import { Injectable } from '@nestjs/common';
import { RefreshToken, Prisma } from '.prisma/waypoint/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService) {}
  async findUnique(
    refreshTokenWhereUnique: Prisma.RefreshTokenCreateInput
  ): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findUnique({
      where: refreshTokenWhereUnique,
    });
  }

  async getLastRefreshToken(userId: string): Promise<RefreshToken> {
    const tokens = await this.refreshTokens({
      where: { userId },
      orderBy: { issued: 'desc' },
    });
    //could use `take : 1` but it'd still be returning an array
    const token = tokens[0];
    return token;
  }

  async refreshTokens(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RefreshTokenWhereUniqueInput;
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithRelationInput;
  }): Promise<RefreshToken[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.refreshToken.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken> {
    return this.prisma.refreshToken.create({
      data,
    });
  }

  async update(
    refreshTokenWhereUniqueInput: Prisma.RefreshTokenWhereUniqueInput,
    refreshTokenUpdateInput: Prisma.RefreshTokenUpdateInput
  ): Promise<RefreshToken> {
    return this.prisma.refreshToken.update({
      where: refreshTokenWhereUniqueInput,
      data: refreshTokenUpdateInput,
    });
  }

  async findMany(): Promise<RefreshToken[]> {
    return this.prisma.refreshToken.findMany();
  }

  async delete(
    refreshTokenWhereUniqueInput: Prisma.RefreshTokenWhereUniqueInput
  ): Promise<RefreshToken> {
    return this.prisma.refreshToken.delete({
      where: refreshTokenWhereUniqueInput,
    });
  }
}
