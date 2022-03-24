import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { IncidentService } from './incident.service';
import { v4 as uuidv4 } from 'uuid';
import { TestIncidentCreateInput } from './incident.repo';
import { IncidentGQL } from '@odst/types/waypoint';

const incidentArray: IncidentGQL[] = [];

TestIncidentCreateInput.forEach((incidentCreateInput) => {
  const incident: IncidentGQL = ((incidentCreateInput as unknown as IncidentGQL).id = uuidv4());
  incidentArray.push(incident);
});

const oneIncident = incidentArray[0];

const db = {
  incident: {
    findMany: jest.fn().mockReturnValue(incidentArray),
    findUnique: jest.fn().mockResolvedValue(oneIncident),
    create: jest.fn().mockResolvedValue(oneIncident),
    update: jest.fn().mockResolvedValue(oneIncident),
    delete: jest.fn().mockResolvedValue(oneIncident),
  },
};

describe('IncidentService', () => {
  let service: IncidentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncidentService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<IncidentService>(IncidentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of incidents', async () => {
      const incidents = await service.findMany({});
      expect(incidents).toEqual(incidentArray);
    });
  });

  describe('findUnique', () => {
    it('should get a single incident', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(oneIncident);
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const incident = await service.create(TestIncidentCreateInput[0]);
      expect(incident).toEqual(oneIncident);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const incident = await service.update(
        { id: 'a uuid' },
        {
          selfReported: false,
        }
      );
      expect(incident).toEqual(oneIncident);
    });
  });

  describe('delete', () => {
    it('should return {deleted: true}', () => {
      expect(service.delete({ id: 'a uuid' })).resolves.toEqual({
        deleted: true,
      });
    });

    it('should return {deleted: false, message: err.message}', () => {
      const dbSpy = jest
        .spyOn(prisma.incident, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
