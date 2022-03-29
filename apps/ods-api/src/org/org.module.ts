import { Module } from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgResolver } from './org.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [OrgResolver, OrgService, PrismaService],
})
export class OrgModule {}
