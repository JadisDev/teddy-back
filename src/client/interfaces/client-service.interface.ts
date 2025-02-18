import { Client } from "../entities/client.entity";
import { CreateClientDto } from "../dto/create-user.dto";
import { PaginationDto } from "../dto/pagination.dto";
import { PaginationResponseDto } from "../dto/pagination-response.dto";

export interface ClientServiceInterface {
  create(data: CreateClientDto): Promise<Client>;
  findAll(): Promise<Client[]>;
  getClientsBySelectionStatusWithPagination(paginationDto: PaginationDto, selected?: boolean): Promise<PaginationResponseDto>;
  updateClientsSelectedToFalseByUuid(uuids: string[]): Promise<void>;
  updateClientByUuid(uuid: string, updateClientDto: Partial<CreateClientDto>): Promise<Partial<CreateClientDto>>
  deleteClientByUuid(uuid: string): Promise<void>;
}