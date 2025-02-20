import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { AuthServiceInterface } from '../interfaces/auth.service.interface';
import { AUTH_SERVICE } from '../constants';

@ApiTags('Autenticação')
@ApiBearerAuth() 
@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authServiceInterface: AuthServiceInterface) {}

  @ApiOperation({ summary: 'Autenticação com nome do usuário' })
  @ApiResponse({ status: 201, description: 'Autenticação com nome do usuário no sistema.' })
  @ApiBody({
    description: 'Nome do usuário para autenticação',
    type: LoginDto,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authServiceInterface.validateUser(loginDto.name)
      .then(name => this.authServiceInterface.login(name));
  }
}
