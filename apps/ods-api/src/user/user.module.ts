import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  //exports userService so auth library can resolve it
  exports: [UserService],
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
