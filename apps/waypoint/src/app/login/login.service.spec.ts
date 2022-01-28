import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService],
      imports: [HttpModule],
    }).compile();
    // getting service modue from main module
    service = module.get<LoginService>(LoginService);
  });
  // now checking if service is available
  it('ApiService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
