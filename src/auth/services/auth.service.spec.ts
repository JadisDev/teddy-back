import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('deve retornar o nome se o nome for fornecido', async () => {
      const result = await service.validateUser('validUser');
      expect(result).toBe('validUser');
    });

    it('deve lançar UnauthorizedException se o nome não for fornecido', async () => {
      await expect(service.validateUser('')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('deve chamar jwtService.sign com o payload correto e retornar o token', async () => {
      const payload = { name: 'validUser' };
      const mockToken = 'mockToken';

      jwtService.sign = jest.fn().mockReturnValue(mockToken);

      const result = await service.login('validUser');
      
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toEqual({ access_token: mockToken });
    });
  });
});
