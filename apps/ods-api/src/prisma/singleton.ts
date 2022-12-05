import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import prisma from './client';
import { PrismaService } from './prisma.service';

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaService>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaService>;
