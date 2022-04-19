import { Injectable, Logger } from '@nestjs/common';
import { User, Prisma, Org, RefreshToken } from '.prisma/ods/client';
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

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
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

  async findUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    Logger.log('UserService.findUnique()');
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async orgs(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<Org[]> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput }).orgs();
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
