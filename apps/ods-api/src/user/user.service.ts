import { Injectable } from '@nestjs/common';
import {
  Comment,
  Org,
  Prisma,
  RefreshToken,
  Role,
  User,
} from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findMany(findManyUserArgs: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prisma.user.findMany(findManyUserArgs);
  }

  //TODO write tests for this
  async findUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  //TODO write tests for this
  async update(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    userUpdateInput: Prisma.UserUpdateInput
  ): Promise<User> {
    return this.prisma.user.update({
      where: userWhereUniqueInput,
      data: userUpdateInput,
    });
  }

  // Intercept this
  async enableAccount(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User> {
    return this.prisma.user.update({
      where: userWhereUniqueInput,
      data: {
        status: {
          set: 'ENABLED',
        },
      },
    });
  }

  async comments(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<Comment[] | null> {
    return this.prisma.user
      .findUnique({ where: userWhereUniqueInput })
      .comments();
  }

  async create(data: Prisma.UserCreateInput): Promise<{ id: string }> {
    data.password = await hash(data.password, 10);

    return this.prisma.user.create({
      data,
      select: { id: true },
    });
  }

  //TODO write tests for this
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
  ): Promise<Org[] | null> {
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

  //TODO [ODST-303]: Reuse the org functions in the feedback response module to filter down
  // instead of duplicating code in account request
  async findManyRequestedAccounts(user: User): Promise<Partial<User>[]> {
    const whereUser: Prisma.OrgWhereInput = {
      users: {
        some: {
          id: user.id,
        },
      },
    };

    switch (user.role) {
      case Role.ADMIN: {
        return this.prisma.user.findMany({
          where: {
            status: 'REQUESTED',
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            grade: true,
            role: true,
            email: true,
            orgs: true,
            status: true,
          },
        });
      }
      case Role.DEI:
      case Role.CC: {
        return this.prisma.user.findMany({
          select: {
            id: true,
            firstName: true,
            lastName: true,
            grade: true,
            role: true,
            email: true,
            orgs: true,
            status: true,
          },
          where: {
            AND: {
              status: 'REQUESTED',
              orgs: {
                some: {
                  OR: [
                    whereUser,
                    {
                      parent: whereUser,
                    },

                    {
                      parent: {
                        parent: whereUser,
                      },
                    },
                  ],
                },
              },
            },
          },
        });
      }
      default: {
        return [];
      }
    }
  }
}
