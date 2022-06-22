import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TagService } from './Tag.service';
import { MockTags } from './Tag.repo';

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: PrismaService,
          useValue: {
            tag: {
              findMany: jest.fn().mockResolvedValue(MockTags),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('findUnique', () => {
    it('should get a single Tag', async () => {
      await expect(service.getTags()).resolves.toEqual(MockTags);
    });
  });
});
