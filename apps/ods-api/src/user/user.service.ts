import { Injectable } from '@nestjs/common';
import { User, Comment, Org, RefreshToken, Prisma } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    userUpdateInput: Prisma.UserUpdateInput
  ): Promise<User> {
    return this.prisma.user.update({
      where: userWhereUniqueInput,
      data: userUpdateInput,
    });
  }

  async orgs(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<Org[]> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput }).orgs();
  }

  async comments(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<Comment[]> {
    return this.prisma.user
      .findUnique({ where: userWhereUniqueInput })
      .comments();
  }

  async refreshToken(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<RefreshToken | null> {
    return this.prisma.user
      .findUnique({
        where: userWhereUniqueInput,
      })
      .refreshToken();
  }
}
