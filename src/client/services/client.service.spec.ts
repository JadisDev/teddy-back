import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { ClientRepository } from '../repositories/client.repository';
import { CreateClientDto } from '../dto/create-user.dto';
import { Client } from '../entities/client.entity';
import { NotFoundException } from '@nestjs/common';

describe('ClientService', () => {
  let service: ClientService;
  let repository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: ClientRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findBySelectionStatusWithPagination: jest.fn(),
            updateSelectedToFalseByUuid: jest.fn(),
            updateByUuid: jest.fn(),
            deleteClientByUuid: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<ClientRepository>(ClientRepository);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo cliente', async () => {
      const createClientDto: CreateClientDto = { name: 'Cliente 1', wage: 5000, company_value: 100000, selected: false };
      const mockClient: Client = { id: 'uuid-1', ...createClientDto };

      jest.spyOn(repository, 'create').mockResolvedValue(mockClient);

      const result = await service.create(createClientDto);

      expect(result).toEqual(mockClient);
      expect(repository.create).toHaveBeenCalledWith(createClientDto);
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de clientes', async () => {
      const mockClients: Client[] = [
        { id: 'uuid-1', name: 'Cliente 1', wage: 5000, company_value: 100000, selected: false },
        { id: 'uuid-2', name: 'Cliente 2', wage: 6000, company_value: 150000, selected: false },
      ];

      jest.spyOn(repository, 'findAll').mockResolvedValue(mockClients);

      const result = await service.findAll();

      expect(result).toEqual(mockClients);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateClientByUuid', () => {
    it('deve atualizar um cliente existente', async () => {
      const uuid = 'uuid-1';
      const updateData = { name: 'Cliente Atualizado' };
      const updatedClient = { id: uuid, name: 'Cliente Atualizado', wage: 5000, company_value: 100000 };

      jest.spyOn(repository, 'updateByUuid').mockResolvedValue(updatedClient);

      const result = await service.updateClientByUuid(uuid, updateData);

      expect(result).toEqual(updatedClient);
      expect(repository.updateByUuid).toHaveBeenCalledWith(uuid, updateData);
    });

    it('deve lançar NotFoundException se o cliente não for encontrado', async () => {
      const uuid = 'uuid-nao-existe';
      const updateData = { name: 'Cliente Atualizado' };

      jest.spyOn(repository, 'updateByUuid').mockRejectedValue(new NotFoundException());

      await expect(service.updateClientByUuid(uuid, updateData)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteClientByUuid', () => {
    it('deve deletar um cliente pelo UUID', async () => {
      const uuid = 'uuid-1';

      jest.spyOn(repository, 'deleteClientByUuid').mockResolvedValue(undefined);

      await service.deleteClientByUuid(uuid);

      expect(repository.deleteClientByUuid).toHaveBeenCalledWith(uuid);
    });
  });
});
