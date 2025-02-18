import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-user.dto';
import { ClientServiceInterface } from '../interfaces/client-service.interface';
import { PaginationResponseDto } from '../dto/pagination-response.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { ClientRepository } from '../repositories/client.repository';

@Injectable()
export class ClientService implements ClientServiceInterface {

  constructor(private readonly clientRepository: ClientRepository) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    return this.clientRepository.create(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  async getClientsBySelectionStatusWithPagination(
    paginationDto: PaginationDto,
    selected = false,
  ): Promise<PaginationResponseDto> {
    return this.clientRepository.findBySelectionStatusWithPagination(paginationDto, selected);
  }

  async updateClientsSelectedToFalseByUuid(uuids: string[]): Promise<void> {
    await this.clientRepository.updateSelectedToFalseByUuid(uuids);
  }

  async updateClientByUuid(
    uuid: string,
    updateClientDto: Partial<CreateClientDto>,
  ): Promise<Partial<CreateClientDto>> {
    return this.clientRepository.updateByUuid(uuid, updateClientDto);
  }

  async deleteClientByUuid(uuid: string): Promise<void> {
    await this.clientRepository.deleteClientByUuid(uuid);
  }
}
