import { Injectable } from '@nestjs/common';
import {
  Prisma,
  User,
} from '.prisma/corps/client';
import { PrismaService } from '../prisma/prisma.service';

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

  async refreshToken(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<null> {
    return this.prisma.user.findMany()[0]
  }
}
