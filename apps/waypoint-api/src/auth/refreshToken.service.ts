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

}
