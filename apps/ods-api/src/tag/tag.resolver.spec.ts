import { Test, TestingModule } from '@nestjs/testing';
import { TagResolver } from './Tag.resolver';
import { TagService } from './Tag.service';
import { MockTags } from './Tag.repo';

describe('Tag Resolver', () => {
  let resolver: TagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagResolver],
      providers: [
        {
          provide: TagService,
          useValue: {
            getTags: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MockTags)),
          },
        },
      ],
    }).compile();

    resolver = module.get<TagResolver>(TagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getTags', () => {
    it('should get all tags', async () => {
      await expect(resolver.getTags()).resolves.toEqual(MockTags);
    });
  });
});
