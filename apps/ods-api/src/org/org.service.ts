import { Injectable } from '@nestjs/common';
import { Org, Prisma, User, Survey } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrgService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrgWhereUniqueInput;
    where?: Prisma.OrgWhereInput;
    orderBy?: Prisma.OrgOrderByWithRelationInput;
  }): Promise<Org[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.org.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getAllChildren(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Org[]> {
    const parentOrg = await this.prisma.org.findUnique({
      where: orgWhereUniqueInput,
    });

    // Escape the method if the parentOrg is not found
    if (!parentOrg) {
      return [];
    }

    const orgs = await this.prisma.org.findMany({
      where: {
        parent: {
          id: parentOrg.id,
        },
      },
    });

    if (orgs != null) {
      orgs.push(parentOrg);
    }

    return orgs as Org[];
  }

  async findUnique(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Org | null> {
    return this.prisma.org.findUnique({
      where: orgWhereUniqueInput,
    });
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    return this.prisma.org.create({
      data,
    });
  }

  async update(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput,
    orgUpdateInput: Prisma.OrgUpdateInput
  ): Promise<Org> {
    return this.prisma.org.update({
      where: orgWhereUniqueInput,
      data: orgUpdateInput,
    });
  }

  async delete(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.org.delete({
        where: orgWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async users(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<User[]> {
    return this.prisma.org.findUnique({ where: orgWhereUniqueInput }).users();
  }

  async children(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Org[]> {
    return this.prisma.org
      .findUnique({ where: orgWhereUniqueInput })
      .children();
  }

  async parent(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Org | null> {
    return this.prisma.org.findUnique({ where: orgWhereUniqueInput }).parent();
  }

  async surveys(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Survey[]> {
    return this.prisma.org.findUnique({ where: orgWhereUniqueInput }).surveys();
  }
}
