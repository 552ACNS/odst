import { Injectable } from '@nestjs/common';
import { User, Comment, Prisma, Org, RefreshToken } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';

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

  async comments(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<Comment[]> {
    return this.prisma.user
      .findUnique({ where: userWhereUniqueInput })
      .comments();
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await hash(data.password, 10);

    return this.prisma.user.create({
      data,
    });
  }

  async delete(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    let deletedUser: User | null = null;

    try {
      deletedUser = await this.prisma.user.delete({
        where: userWhereUniqueInput,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(err?.meta?.cause);
      }
    }
    return deletedUser;
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
