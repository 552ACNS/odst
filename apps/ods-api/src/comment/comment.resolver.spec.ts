import { Test, TestingModule } from '@nestjs/testing';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

describe('Comment Resolver', () => {
  let resolver: CommentResolver;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentResolver],
      providers: [
        {
          provide: CommentService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<CommentResolver>(CommentResolver);
    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
