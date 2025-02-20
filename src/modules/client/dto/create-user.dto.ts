import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nome do cliente',
    type: String,
    example: 'Teddy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Salário do cliente',
    type: Number,
    example: 3000.5,
  })
  @IsNumber({ allowNaN: false }, { message: 'Wage must be a valid number' })
  @IsNotEmpty()
  wage: number;

  @ApiProperty({
    description: 'Valor da empresa do cliente',
    type: Number,
    example: 500000.0,
  })
  @IsNumber(
    { allowNaN: false },
    { message: 'Company value must be a valid number' },
  )
  @IsNotEmpty()
  company_value: number;

  @ApiProperty({
    description: 'Status de seleção do cliente (true/false)',
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  selected: boolean;
}
