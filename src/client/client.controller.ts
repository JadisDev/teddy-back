import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {

    constructor(private readonly clientService: ClientService) {}

    @Get()
    getHello(): string {
        return this.clientService.getHello();
    }
}
