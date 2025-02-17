import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './models/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-user.dto';
import { ClientServiceInterface } from './interfaces/client-service.interface';

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
}
