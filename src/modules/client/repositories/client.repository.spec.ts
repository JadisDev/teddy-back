import { Test, TestingModule } from '@nestjs/testing';
import { ClientRepository } from './client.repository';
import { Client } from '../entities/client.entity';
import { In, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateClientDto } from '../dto/create-user.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('ClientRepository', () => {
  let repository: ClientRepository;
  let ormRepository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientRepository,
        {
          provide: getRepositoryToken(Client),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<ClientRepository>(ClientRepository);
    ormRepository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('deve estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo cliente', async () => {
      const createClientDto: CreateClientDto = { name: 'Cliente 1', wage: 5000, company_value: 100000, selected: false };
      const mockClient: Client = { id: 'uuid-1', ...createClientDto };

      jest.spyOn(ormRepository, 'create').mockReturnValue(mockClient);
      jest.spyOn(ormRepository, 'save').mockResolvedValue(mockClient);

      const result = await repository.create(createClientDto);

      expect(result).toEqual(mockClient);
      expect(ormRepository.create).toHaveBeenCalledWith(createClientDto);
      expect(ormRepository.save).toHaveBeenCalledWith(mockClient);
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de clientes', async () => {
      const mockClients: Client[] = [
        { id: 'uuid-1', name: 'Cliente 1', wage: 5000, company_value: 100000, selected: false },
        { id: 'uuid-2', name: 'Cliente 2', wage: 6000, company_value: 150000, selected: false },
      ];

      jest.spyOn(ormRepository, 'find').mockResolvedValue(mockClients);

      const result = await repository.findAll();

      expect(result).toEqual(mockClients);
      expect(ormRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateSelectedToFalseByUuid', () => {
    it('deve atualizar os clientes selecionados para false', async () => {
      const mockUuids = ['uuid-1', 'uuid-2'];

      jest.spyOn(ormRepository, 'update').mockResolvedValue({
        raw: [],
        affected: 1,
      } as UpdateResult);

      await repository.updateSelectedToFalseByUuid(mockUuids);

      expect(ormRepository.update).toHaveBeenCalledWith(
        { id: In(mockUuids) },
        { selected: false },
      );
    });
  });

  describe('updateByUuid', () => {
    it('deve atualizar um cliente pelo UUID', async () => {
      const uuid = 'uuid-1';
      const updateData = { name: 'Cliente Atualizado' };
      const updatedClient: Client = { id: uuid, name: 'Cliente Atualizado', wage: 5000, company_value: 100000, selected: false };

      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(updatedClient);
      jest.spyOn(ormRepository, 'update').mockResolvedValue({
        raw: [],
        affected: 1,
      } as UpdateResult)

      const result = await repository.updateByUuid(uuid, updateData);

      expect(result).toEqual(updateData);
      expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: uuid } });
      expect(ormRepository.update).toHaveBeenCalledWith({ id: uuid }, updateData);
    });

    it('deve lançar NotFoundException se o cliente não for encontrado', async () => {
      const uuid = 'uuid-nao-existe';
      const updateData = { name: 'Cliente Atualizado' };

      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(null);

      await expect(repository.updateByUuid(uuid, updateData)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteByUuid', () => {
    it('deve deletar um cliente pelo UUID', async () => {
      const uuid = 'uuid-1';

      jest.spyOn(ormRepository, 'findOne').mockResolvedValue({ id: uuid } as any);
      jest.spyOn(ormRepository, 'delete').mockResolvedValue({
        raw: [],
        affected: 1,
      } as DeleteResult);

      await repository.deleteByUuid(uuid);

      expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: uuid } });
      expect(ormRepository.delete).toHaveBeenCalledWith({ id: uuid });
    });

    it('deve lançar NotFoundException se o cliente não for encontrado', async () => {
      const uuid = 'uuid-nao-existe';

      jest.spyOn(ormRepository, 'findOne').mockResolvedValue(null);

      await expect(repository.deleteByUuid(uuid)).rejects.toThrow(NotFoundException);
    });
  });
});