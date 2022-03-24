import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenService } from './refreshToken.service';
import { v4 as uuidv4 } from 'uuid';
import { TestRefreshTokenCreateInput } from './refreshToken.repo';
import { RefreshTokenGQL } from '@odst/types/waypoint';

const refreshTokenArray: RefreshTokenGQL[] = [];

TestRefreshTokenCreateInput.forEach((refreshTokenCreateInput) => {
  const refreshToken: RefreshTokenGQL = ((
    refreshTokenCreateInput as unknown as RefreshTokenGQL
  ).id = uuidv4());
  refreshTokenArray.push(refreshToken);
});

const oneRefreshToken = refreshTokenArray[0];

const db = {
  refreshToken: {
    findMany: jest.fn().mockReturnValue(refreshTokenArray),
    findUnique: jest.fn().mockResolvedValue(oneRefreshToken),
    update: jest.fn().mockResolvedValue(oneRefreshToken),
    create: jest.fn().mockResolvedValue(oneRefreshToken),
    delete: jest.fn().mockResolvedValue(oneRefreshToken),
    refreshTokens: jest.fn().mockResolvedValue(refreshTokenArray),
  },
};

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<RefreshTokenService>(RefreshTokenService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of refreshTokens', async () => {
      const refreshTokens = await service.findMany({});
      expect(refreshTokens).toEqual(refreshTokenArray);
    });
  });

  describe('findUnique', () => {
    it('should get a single refreshToken', () => {
      expect(service.findUnique({ id: 'a uuid' })).resolves.toEqual(
        oneRefreshToken
      );
    });
  });

  describe('create', () => {
    it('should call the create method', async () => {
      const refreshToken = await service.create(TestRefreshTokenCreateInput[0]);
      expect(refreshToken).toEqual(oneRefreshToken);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const refreshToken = await service.update(
        { id: 'a uuid' },
        {
          isRevoked: true,
        }
      );
      expect(refreshToken).toEqual(oneRefreshToken);
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
        .spyOn(prisma.refreshToken, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.delete({ id: 'a bad uuid' })).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
