import { Injectable } from '@nestjs/common';
import { RefreshToken, Prisma } from '@prisma/client';
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

  //TODO shouldn't be deleting, only invalidating
  //TODO redo this though, hack to make deleting all tokens easy.
  async delete(
    refreshTokenWhereUniqueInput: Prisma.RefreshTokenWhereUniqueInput
  ) {
    const tokens = await this.findMany();
    const token = tokens.pop();
    const returnVal = await this.prisma.refreshToken.delete({
      where: { id: token?.id },
    });
    tokens.forEach((token) => {
      if (token.id !== refreshTokenWhereUniqueInput.id) {
        this.prisma.refreshToken.delete({ where: { id: token.id } });
      }
    });

    return returnVal;
  }
}
