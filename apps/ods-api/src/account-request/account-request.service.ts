import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccountRequest, User, Org, Prisma } from '.prisma/ods/client';
import { hash } from 'bcrypt';

@Injectable()
export class AccountRequestService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AccountRequestWhereUniqueInput;
    where?: Prisma.AccountRequestWhereInput;
    orderBy?: Prisma.AccountRequestOrderByWithRelationInput;
  }): Promise<AccountRequest[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.accountRequest.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async approveRequest(
    accountRequestWhereUniqueInput: Prisma.AccountRequestWhereUniqueInput,
    approver: User
  ): Promise<User | null> {
    const [request, orgs] = await this.prisma.$transaction([
      this.prisma.accountRequest.findUnique({
        where: accountRequestWhereUniqueInput,
        select: {
          email: true,
          password: true,
          rank: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      }),
      this.prisma.org.findMany({
        where: { accountRequests: { some: accountRequestWhereUniqueInput } },
        select: {
          id: true,
        },
      }),
    ]);

    if (!request) return null;

    const user = await this.prisma.user.create({
      data: { ...request, orgs: { connect: orgs } },
    });

    //could have this up in the transaction
    //but then it could run then have create fail
    //Or could use interactive transaction for bottom two/all four
    await this.prisma.accountRequest.update({
      where: accountRequestWhereUniqueInput,
      data: { approver: { connect: { id: approver.id } }, denied: true },
    });
    return user;
  }

  async declineRequest(
    accountRequestWhereUniqueInput: Prisma.AccountRequestWhereUniqueInput
  ): Promise<AccountRequest> {
    return this.prisma.accountRequest.update({
      where: accountRequestWhereUniqueInput,
      data: { denied: true },
      //TODO auto generate comment indicating who declined?
      //Could do the same with approve relationship
    });
  }

  async create(
    data: Prisma.AccountRequestCreateInput
  ): Promise<AccountRequest> {
    data.password = await hash(data.password, 10);
    return this.prisma.accountRequest.create({
      data,
    });
  }

  async approver(
    accountRequestWhereUniqueInput: Prisma.AccountRequestWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.accountRequest
      .findUnique({ where: accountRequestWhereUniqueInput })
      .approver();
  }

  async orgs(
    accountRequestWhereUniqueInput: Prisma.AccountRequestWhereUniqueInput
  ): Promise<Org[]> {
    return this.prisma.accountRequest
      .findUnique({ where: accountRequestWhereUniqueInput })
      .orgs();
  }
}
