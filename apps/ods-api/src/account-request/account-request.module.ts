import { Module } from '@nestjs/common';
import { AccountRequestService } from './account-request.service';
import { AccountRequestResolver } from './account-request.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AccountRequestResolver, AccountRequestService, PrismaService],
})
export class AccountRequestModule {}
