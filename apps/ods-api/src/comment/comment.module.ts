import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  exports: [CommentService],
  providers: [CommentResolver, CommentService, PrismaService],
})
export class CommentModule {}
