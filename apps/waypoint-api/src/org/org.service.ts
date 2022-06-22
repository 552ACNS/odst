import { Injectable } from '@nestjs/common';
import { Org, Prisma } from '.prisma/waypoint/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrgService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput
  ): Promise<Org | null> {
    return this.prisma.org.findUnique({
      where: orgWhereUniqueInput,
    });
  }

  async orgs(params: {
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
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    return this.prisma.org.create({
      data,
    });
  }

  async findMany(): Promise<Org[]> {
    return this.prisma.org.findMany();
  }

  async getSubOrgs(
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

  async update(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput,
    orgUpdateInput: Prisma.OrgUpdateInput
  ): Promise<Org> {
    return this.prisma.org.update({
      where: orgWhereUniqueInput,
      data: orgUpdateInput,
    });
  }

  async delete(orgWhereUniqueInput: Prisma.OrgWhereUniqueInput): Promise<Org> {
    return this.prisma.org.delete({
      where: orgWhereUniqueInput,
    });
  }

  async upsert(
    orgWhereUniqueInput: Prisma.OrgWhereUniqueInput,
    orgUpdateInput: Prisma.OrgUpdateInput,
    orgCreateInput: Prisma.OrgCreateInput
  ): Promise<Org> {
    return this.prisma.org.upsert({
      where: orgWhereUniqueInput,
      update: orgUpdateInput,
      create: orgCreateInput,
    });
  }
}
