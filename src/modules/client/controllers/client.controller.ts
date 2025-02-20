import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-user.dto';
import { CLIENT_SERVICE } from '../constants';
import { ClientServiceInterface } from '../interfaces/client-service.interface';
import { PaginationDto } from '../dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UuidArrayDto } from '../dto/uuid-list.dto';

@ApiTags('Clientes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('client')
export class ClientController {
  constructor(
    @Inject(CLIENT_SERVICE)
    private readonly clientService: ClientServiceInterface,
  ) {}

  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista todos os clientes do sistema.',
  })
  @Get()
  async getHello(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @ApiOperation({ summary: 'Cadastrar novo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro de um novo cliente no sistema.',
  })
  @ApiBody({
    description: 'Informações para cadastrar um novo cliente.',
    type: CreateClientDto,
  })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Lista clientes não selecionados' })
  @ApiResponse({
    status: 200,
    description: 'Lista clientes não selecionados com paginação.',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Número da página para a paginação',
    required: true,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Número de clientes por página',
    required: true,
    example: 10,
  })
  @Get('pagination')
  async findAllPagination(@Query() paginationDto: PaginationDto) {
    return this.clientService.getClientsBySelectionStatusWithPagination(
      paginationDto,
    );
  }

  @ApiOperation({ summary: 'Atualiza clientes para não selecionados' })
  @ApiResponse({ status: 200, description: 'Atualiza clientes pelo uuid.' })
  @ApiBody({
    type: UuidArrayDto,
  })
  @Patch('update-selected-false')
  async updateSelectedToFalse(@Body() uuids: UuidArrayDto): Promise<void> {
    return this.clientService.updateClientsSelectedToFalseByUuid(uuids.uuids);
  }

  @ApiOperation({ summary: 'Atualizar um cliente pelo UUID' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'uuid', description: 'UUID do cliente a ser atualizado' })
  @ApiBody({
    type: CreateClientDto,
    description: 'Dados atualizados do cliente',
  })
  @Patch(':uuid')
  async updateClient(
    @Param('uuid') uuid: string,
    @Body() updateClientDto: Partial<CreateClientDto>,
  ) {
    const updatedClient = await this.clientService.updateClientByUuid(
      uuid,
      updateClientDto,
    );
    return updatedClient;
  }

  @ApiOperation({ summary: 'Deletar um cliente pelo UUID' })
  @ApiResponse({ status: 200, description: 'Cliente deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @Delete(':uuid')
  async deleteClient(@Param('uuid') uuid: string): Promise<void> {
    return this.clientService.deleteClientByUuid(uuid);
  }

  @ApiOperation({ summary: 'Lista todos os clientes selecionados' })
  @ApiResponse({
    status: 200,
    description: 'Lista todos os clientes selecionados do sistema.',
  })
  @Get('selected')
  async getClientsSelected(): Promise<Client[]> {
    return await this.clientService.findAllClientsSelected();
  }
}
