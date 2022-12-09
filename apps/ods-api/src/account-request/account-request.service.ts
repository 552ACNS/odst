import { Injectable } from '@nestjs/common';
import { Comment, Prisma, AccountRequest } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountRequestService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    accountRequestWhereUniqueInput: Prisma.AccountRequestWhereUniqueInput
  ): Promise<AccountRequest | null> {
    return this.prisma.accountRequest.findUnique({
      where: accountRequestWhereUniqueInput,
    });
  }

  async update(
    data: Prisma.AccountRequestUpdateInput,
    where: Prisma.AccountRequestWhereUniqueInput
  ): Promise<AccountRequest> {
    return this.prisma.accountRequest.update({
      data,
      where,
    });
  }

  async comments(
    accountRequestWhereUniqueInput: Prisma.AccountRequestWhereUniqueInput
  ): Promise<Comment[] | null> {
    return this.prisma.accountRequest
      .findUnique({ where: accountRequestWhereUniqueInput })
      .comments({
        orderBy: {
          date: 'asc',
        },
      });
  }
}
