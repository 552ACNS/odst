import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { OrgService } from '../org/org.service';

@Module({
  providers: [ UserResolver, UserService, OrgService, PrismaService],
})
export class UserModule {}
