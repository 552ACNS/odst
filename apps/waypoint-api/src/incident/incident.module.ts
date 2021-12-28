import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentResolver } from './incident.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [IncidentResolver, IncidentService, PrismaService],
})
export class IncidentModule {}
