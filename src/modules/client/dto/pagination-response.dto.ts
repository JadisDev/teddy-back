import { Client } from '../entities/client.entity';
import { IsArray, IsInt, IsObject, Min } from 'class-validator';

export class PaginationResponseDto {
  @IsArray()
  data: Client[];

  @IsInt()
  @Min(0)
  total: number;

  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  limit: number;
}
