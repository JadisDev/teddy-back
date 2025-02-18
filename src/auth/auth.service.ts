import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string): Promise<any> {
    if (name) {
      return name;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(name: string) {
    const payload = { name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
