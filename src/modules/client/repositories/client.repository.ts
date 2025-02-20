import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-user.dto';
import { PaginationResponseDto } from '../dto/pagination-response.dto';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findBySelectionStatusWithPagination(
    paginationDto: PaginationDto,
    selected = false,
  ): Promise<PaginationResponseDto> {
    const page = paginationDto?.page ?? 1;
    const limit = paginationDto?.limit ?? 10;

    const [data, total] = await this.clientRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: [{ selected }],
      order: { name: 'ASC' },
    });

    return { data, total, page, limit };
  }

  async updateSelectedToFalseByUuid(uuids: string[]): Promise<void> {
    await this.clientRepository.update({ id: In(uuids) }, { selected: false });
  }

  async updateByUuid(
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

  async deleteByUuid(uuid: string): Promise<void> {
    const client = await this.clientRepository.findOne({ where: { id: uuid } });

    if (!client) {
      throw new NotFoundException(`Cliente com UUID ${uuid} não encontrado`);
    }

    await this.clientRepository.delete({ id: uuid });
  }

  async deleteClientByUuid(uuid: string): Promise<void> {
    const client = await this.clientRepository.findOne({ where: { id: uuid } });

    if (!client) {
      throw new NotFoundException(`Cliente com UUID ${uuid} não encontrado`);
    }

    await this.clientRepository.delete({ id: uuid });
  }

  async findAllClientsSelected(): Promise<Client[]> {
    return await this.clientRepository.find({
      where: { selected: true },
      order: { name: 'ASC' },
    });
  }
}
