import { Injectable } from '@nestjs/common';
import { Prisma, Incident } from '.prisma/waypoint/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IncidentService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IncidentWhereUniqueInput;
    where?: Prisma.IncidentWhereInput;
    orderBy?: Prisma.IncidentOrderByWithRelationInput;
  }): Promise<Incident[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.incident.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUnique(
    incidentWhereUniqueInput: Prisma.IncidentWhereUniqueInput
  ): Promise<Incident | null> {
    return this.prisma.incident.findUnique({
      where: incidentWhereUniqueInput,
    });
  }

  async create(data: Prisma.IncidentCreateInput): Promise<Incident> {
    return this.prisma.incident.create({
      data,
    });
  }

  async update(
    incidentWhereUniqueInput: Prisma.IncidentWhereUniqueInput,
    incidentUpdateInput: Prisma.IncidentUpdateInput
  ): Promise<Incident> {
    return this.prisma.incident.update({
      where: incidentWhereUniqueInput,
      data: incidentUpdateInput,
    });
  }

  async delete(
    incidentWhereUniqueInput: Prisma.IncidentWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.incident.delete({
        where: incidentWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
