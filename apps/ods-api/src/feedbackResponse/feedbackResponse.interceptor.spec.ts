import { FeedbackResponseInterceptor } from './feedbackResponse.interceptor';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MockOrgs } from '../org/org.repo';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext } from '@nestjs/common';
import { mock } from 'jest-mock-extended';
import { MockUsers } from '../user/user.repo';

const context: any = mock<GqlExecutionContext>();

const callHandler = {
  handle: jest.fn(),
};

describe('feedbackResponseInterceptor', () => {
  const db = {
    org: {
      findMany: jest.fn().mockResolvedValue(MockOrgs),
    },
  };

  let prisma: PrismaService;
  let interceptor: FeedbackResponseInterceptor;

  const mockedCreate = jest.fn().mockImplementation((ctx: ExecutionContext) => {
    return {
      getContext: jest.fn().mockReturnValue({
        req: {
          body: { variables: { where: false } },
          user: { id: 'Woah', role: 'CC' },
        },
      }),
    };
  });

  GqlExecutionContext.create = mockedCreate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: db,
        },
        {
          provide: GqlExecutionContext,
          useValue: context,
        },
        FeedbackResponseInterceptor,
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    interceptor = module.get<FeedbackResponseInterceptor>(
      FeedbackResponseInterceptor
    );
  });

  it('should be defined', () => {
    console.log(interceptor);
    expect(interceptor).toBeDefined();
  });

  it('should intercept', async () => {
    callHandler.handle.mockResolvedValueOnce('next handle');
    const actualValue = await interceptor.intercept(context, callHandler);
    expect(actualValue).toBe('next handle');
  });

  it('should change the where property', async () => {
    const actual = await interceptor.getUsersOrgs(MockUsers[0]);
    const expected = ['org name', 'other org name'];
    expect(actual).toEqual(expected);
  });
});
