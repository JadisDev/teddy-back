import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from './models/client.entity';
import { CLIENT_SERVICE } from './constants';

@Module({
  imports:[TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    {
      provide: CLIENT_SERVICE,
      useClass: ClientService
    }
  ],
  exports: [CLIENT_SERVICE]
})
export class ClientModule {}
