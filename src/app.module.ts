import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client/models/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'teddyuser',
    password: 'teddypassword',
    database: 'teddydb',
    entities: [Client], 
    synchronize: true,
    }),
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
