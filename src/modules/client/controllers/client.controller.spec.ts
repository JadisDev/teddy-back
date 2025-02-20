import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientServiceInterface } from '../interfaces/client-service.interface';
import { CLIENT_SERVICE } from '../constants';
import { CreateClientDto } from '../dto/create-user.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UuidArrayDto } from '../dto/uuid-list.dto';

describe('ClientController', () => {
  let controller: ClientController;
  let clientService: ClientServiceInterface;

  const mockClientService = {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 'uuid', ...dto })),
    getClientsBySelectionStatusWithPagination: jest.fn().mockResolvedValue({
      data: [],
      total: 0,
      page: 1,
      limit: 10,
    }),
    updateClientsSelectedToFalseByUuid: jest.fn().mockResolvedValue(undefined),
    updateClientByUuid: jest.fn().mockImplementation((uuid, dto) => Promise.resolve({ id: uuid, ...dto })),
    deleteClientByUuid: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: CLIENT_SERVICE,
          useValue: mockClientService,
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    clientService = module.get<ClientServiceInterface>(CLIENT_SERVICE);
  });

  it('Deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /client', () => {
    it('deve chamar findAll do service e retornar a lista de clientes', async () => {
      const mockClients = [
        { id: 'uuid-1', name: 'Cliente 1', wage: 5000, company_value: 100000, selected: false },
        { id: 'uuid-2', name: 'Cliente 2', wage: 6000, company_value: 150000, selected: true },
      ];
      jest.spyOn(clientService, 'findAll').mockResolvedValue(mockClients);
      const result = await controller.getHello();
      expect(result).toEqual(mockClients);
      expect(clientService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /client', () => {
    it('deve chamar create do service e retornar o cliente criado', async () => {
      const dto: CreateClientDto = { name: 'Test', wage: 3000, company_value: 50000, selected: false };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: 'uuid', ...dto });
      expect(clientService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /client/pagination', () => {
    it('deve chamar getClientsBySelectionStatusWithPagination e retornar os clientes paginados', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10 };
      const result = await controller.findAllPagination(paginationDto);
      expect(result).toEqual({ data: [], total: 0, page: 1, limit: 10 });
      expect(clientService.getClientsBySelectionStatusWithPagination).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('PATCH /client/update-selected-false', () => {
    it('deve chamar updateClientsSelectedToFalseByUuid e retornar void', async () => {
      const uuidsDto: UuidArrayDto = { uuids: ['uuid1', 'uuid2'] };
      await controller.updateSelectedToFalse(uuidsDto);
      expect(clientService.updateClientsSelectedToFalseByUuid).toHaveBeenCalledWith(uuidsDto.uuids);
    });
  });

  describe('PATCH /client/:uuid', () => {
    it('deve chamar updateClientByUuid e retornar o cliente atualizado', async () => {
      const uuid = 'uuid';
      const updateDto = { name: 'Updated' };
      const result = await controller.updateClient(uuid, updateDto);
      expect(result).toEqual({ id: uuid, ...updateDto });
      expect(clientService.updateClientByUuid).toHaveBeenCalledWith(uuid, updateDto);
    });
  });

  describe('DELETE /client/:uuid', () => {
    it('deve chamar deleteClientByUuid e retornar void', async () => {
      const uuid = 'uuid';
      await controller.deleteClient(uuid);
      expect(clientService.deleteClientByUuid).toHaveBeenCalledWith(uuid);
    });
  });
});
