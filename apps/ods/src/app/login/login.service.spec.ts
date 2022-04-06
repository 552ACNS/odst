import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService],
      imports: [HttpModule],
    }).compile();
    service = module.get<LoginService>(LoginService);
  });

  it('ApiService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
