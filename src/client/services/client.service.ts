import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-user.dto';
import { ClientServiceInterface } from '../interfaces/client-service.interface';
import { PaginationResponseDto } from '../dto/pagination-response.dto';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class ClientService implements ClientServiceInterface {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async getClientsBySelectionStatusWithPagination(
    paginationDto: PaginationDto,
    selected = false,
  ): Promise<PaginationResponseDto> {
    const page = paginationDto?.page ?? 1;
    const limit = paginationDto?.limit ?? 10;

    const [data, total] = await this.clientRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: [{ selected }],
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async updateClientsSelectedToFalseByUuid(uuids: string[]): Promise<void> {
    await this.clientRepository.update({ id: In(uuids) }, { selected: false });
  }

  async updateClientByUuid(
    uuid: string,
    updateClientDto: Partial<CreateClientDto>,
  ): Promise<Partial<CreateClientDto>> {
    const client = await this.clientRepository.findOne({ where: { id: uuid } });

    if (!client) {
      throw new NotFoundException(`Cliente com UUID ${uuid} não encontrado`);
    }

    await this.clientRepository.update({ id: uuid }, updateClientDto);
    return updateClientDto;
  }

  async deleteClientByUuid(uuid: string): Promise<void> {
    const client = await this.clientRepository.findOne({ where: { id: uuid } });
    
    if (!client) {
      throw new NotFoundException(`Cliente com UUID ${uuid} não encontrado`);
    }
  
    await this.clientRepository.delete({ id: uuid });
  }
}
