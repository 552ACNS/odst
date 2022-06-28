import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tag } from '.prisma/ods/client';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getTags(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }
}
