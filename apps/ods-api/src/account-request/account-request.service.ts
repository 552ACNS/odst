import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccountRequest, User, Prisma } from '.prisma/ods/client';

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

  async findUnique(
    accountrequestWhereUniqueInput: Prisma.AccountRequestWhereUniqueInput
  ): Promise<AccountRequest | null> {
    return this.prisma.accountRequest.findUnique({
      where: accountrequestWhereUniqueInput,
    });
  }

  async approve(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput,
    approver: User
  ): Promise<User | null> {
    const [request, orgs] = await this.prisma.$transaction([
      this.prisma.accountRequest.findUnique({
        where: answerWhereUniqueInput,
        select: {
          email: true,
          password: true,
          rank: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      }),
      this.prisma.accountRequest
        .findUnique({
          where: answerWhereUniqueInput,
          select: {
            id: true,
          },
        })
        .orgs(),
    ]);

    if (!request) return null;

    const user = await this.prisma.user.create({
      data: { ...request, orgs: { connect: orgs } },
    });

    //could have this up in the transaction
    //but then it could run then have create fail
    //Could use interactive transaction for bottom two/all four
    this.prisma.accountRequest.update({
      where: answerWhereUniqueInput,
      data: { approverId: approver.id },
    });

    return user;
  }

  async create(
    data: Prisma.AccountRequestCreateInput
  ): Promise<AccountRequest> {
    return this.prisma.accountRequest.create({
      data,
    });
  }
}
