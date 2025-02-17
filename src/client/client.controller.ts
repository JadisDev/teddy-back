import { Body, Controller, Get, Inject, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Client } from './models/client.entity';
import { CreateClientDto } from './dto/create-user.dto';
import { CLIENT_SERVICE } from './constants';
import { ClientServiceInterface } from './interfaces/client-service.interface';
import { PaginationDto } from './dto/pagination.dto';

@Controller('client')
export class ClientController {

    constructor(
        @Inject(CLIENT_SERVICE) private readonly clientService: ClientServiceInterface,
    ) {}

    @Get()
    async getHello(): Promise<Client[]> {
        return await this.clientService.findAll();
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
        return await this.clientService.create(createClientDto);
    }

    @Get('pagination')
    async findAllPagination(@Query() paginationDto: PaginationDto) {
        return this.clientService.getClientsBySelectionStatusWithPagination(paginationDto);
    }
}
