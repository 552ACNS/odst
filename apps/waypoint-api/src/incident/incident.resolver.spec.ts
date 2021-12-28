import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { IncidentResolver } from './incident.resolver';
import { IncidentService } from './incident.service';

describe('IncidentController', () => {
  let resolver: IncidentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncidentService, PrismaService, IncidentResolver],
    }).compile();

    resolver = module.get<IncidentResolver>(IncidentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
