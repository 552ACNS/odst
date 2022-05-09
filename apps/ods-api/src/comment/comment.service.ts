import { Injectable } from '@nestjs/common';
import { User, Prisma } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async author(
    commentWhereUniqueInput: Prisma.CommentWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.comment
      .findUnique({ where: commentWhereUniqueInput })
      .author();
  }
}
