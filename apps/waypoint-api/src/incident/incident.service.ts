import { Injectable } from '@nestjs/common';
import { Incident, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IncidentService {
  constructor(private prisma: PrismaService) {}
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
}
