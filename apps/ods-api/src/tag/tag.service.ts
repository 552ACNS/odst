import { Injectable } from '@nestjs/common';
import { Tag, Prisma, SurveyResponse } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
  }): Promise<Tag[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tag.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async findUnique(
    tagWhereUniqueInput: Prisma.TagWhereUniqueInput
  ): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where: tagWhereUniqueInput,
    });
  }

  async create(data: Prisma.TagCreateInput): Promise<Tag> {
    return this.prisma.tag.create({
      data,
    });
  }

  async update(
    tagWhereUniqueInput: Prisma.TagWhereUniqueInput,
    tagUpdateInput: Prisma.TagUpdateInput
  ): Promise<Tag> {
    return this.prisma.tag.update({
      where: tagWhereUniqueInput,
      data: tagUpdateInput,
    });
  }
  async delete(
    tagWhereUniqueInput: Prisma.TagWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.tag.delete({
        where: tagWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
  async surveyResponses(
    tagWhereUniqueInput: Prisma.TagWhereUniqueInput
  ): Promise<SurveyResponse[]> {
    return this.prisma.tag
      .findUnique({ where: tagWhereUniqueInput })
      .surveyResponses();
  }
}
