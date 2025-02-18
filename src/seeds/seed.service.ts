import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async seed() {
    const clientsCount = await this.clientRepository.count();
    if (clientsCount === 0) {
      const clients = this.createClients();

      await this.clientRepository.save(clients);
    }
  }

  createClients() {
    const clients:Client[] = [];
    for (let i = 0; i < 20; i++) {
      clients.push({
        name: `Client ${i + 1}`,
        wage: 4534.90,
        company_value: 1000.65,
        selected: false,
        id: uuidv4()
      });
    }
    return clients;
  }
}
