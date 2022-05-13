import { Injectable } from '@nestjs/common';
import { User, Prisma, Org, RefreshToken } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findMany(findManyUserArgs: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prisma.user.findMany(findManyUserArgs);
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

  async create(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await hash(data.password, 10);

    return this.prisma.user.create({
      data,
    });
  }

  async delete(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User> {
    return this.prisma.user.delete({
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
