import { Module } from '@nestjs/common';
import { AccountRequestService } from './accountRequest.service';
import { AccountRequestResolver } from './accountRequest.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AccountRequestResolver, AccountRequestService, PrismaService],
})
export class AccountRequestModule {}
