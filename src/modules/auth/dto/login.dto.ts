import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Nome do usuário para autenticação',
    example: 'Teddy',
  })
  @IsString()
  name: string;
}
