import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
import { Client } from './entities/client.entity';
import { CLIENT_SERVICE } from './constants';
import { ClientRepository } from './repositories/client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    {
      provide: CLIENT_SERVICE,
      useClass: ClientService,
    },
    ClientRepository,
  ],
  exports: [CLIENT_SERVICE],
})
export class ClientModule {}
