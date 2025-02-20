import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthServiceInterface } from '../interfaces/auth.service.interface';
import { LoginDto } from '../dto/login.dto';
import { AUTH_SERVICE } from '../constants';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthServiceInterface;

  beforeEach(async () => {
    const mockAuthService = {
      validateUser: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AUTH_SERVICE,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthServiceInterface>(AUTH_SERVICE);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('deve chamar os métodos de autenticação corretamente e retornar o token', async () => {
      const loginDto: LoginDto = { name: 'userName' };
      const mockToken = { access_token: 'token' };

      authService.validateUser = jest.fn().mockResolvedValue('userName');
      authService.login = jest.fn().mockResolvedValue(mockToken);

      const result = await controller.login(loginDto);

      expect(authService.validateUser).toHaveBeenCalledWith('userName');
      expect(authService.login).toHaveBeenCalledWith('userName');
      
      expect(result).toEqual(mockToken);
    });

    it('deve lançar UnauthorizedException quando o nome do usuário não for válido', async () => {
      const loginDto: LoginDto = { name: '' };

      authService.validateUser = jest.fn().mockRejectedValue(new UnauthorizedException('Invalid credentials'));

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
