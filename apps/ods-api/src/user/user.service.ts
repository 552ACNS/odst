import { Injectable } from '@nestjs/common';
import { User, Prisma, Org, Role } from '.prisma/ods/client';
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

  async findUsersWithRole(role: Role): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        role: role,
      },
    });
  }

  async orgs(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<Org[]> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput }).orgs();
  }
}
