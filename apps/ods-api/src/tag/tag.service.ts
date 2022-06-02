import { Injectable } from '@nestjs/common';
import { Tag, Prisma, SurveyResponse } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getTags(): Promise<string[]> {
    const tags = await this.prisma.tag.findMany({
      select: {
        value: true,
      },
    });

    return tags.map((tag) => tag.value);
  }
}