import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';

@ApiTags('Autenticação')
@ApiBearerAuth() 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Autenticação com nome do usuário' })
  @ApiResponse({ status: 201, description: 'Autenticação com nome do usuário no sistema.' })
  @ApiBody({
    description: 'Nome do usuário para autenticação',
    type: LoginDto,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.name)
      .then(name => this.authService.login(name));
  }
}
