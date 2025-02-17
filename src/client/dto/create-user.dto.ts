import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({ allowNaN: false }, { message: 'Wage must be a valid number' })
  @IsNotEmpty()
  wage: number;

  @IsNumber({ allowNaN: false }, { message: 'Company value must be a valid number' })
  @IsNotEmpty()
  company_value: number;

  @IsBoolean()
  selected: boolean;
}
