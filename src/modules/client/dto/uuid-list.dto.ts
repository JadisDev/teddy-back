import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UuidArrayDto {
  @ApiProperty({
    description:
      'Array de UUIDs dos clientes que devem ter o campo "selected" alterado para false',
    type: [String],
    example: ['uuid-1', 'uuid-2', 'uuid-3'],
  })
  @IsArray()
  @IsString({ each: true })
  uuids: string[];
}
