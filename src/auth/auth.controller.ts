import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() name: string) {
    return this.authService.validateUser(name)
      .then(user => this.authService.login(user));
  }
}
