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

  // Intercept this
  async enableAccount(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User> {
    return this.prisma.user.update({
      where: userWhereUniqueInput,
      data: {
        enabled: {
          set: true,
        },
      },
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

  //TODO: Reuse the org functions in the survey response module to filter down
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
            enabled: false,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            grade: true,
            role: true,
            email: true,
            orgs: true,
            enabled: true,
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
            enabled: true,
          },
          where: {
            enabled: false,
            AND: {
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
