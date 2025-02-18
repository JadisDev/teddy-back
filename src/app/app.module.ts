import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ClientModule } from '../client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

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
    ConfigModule.forRoot(),
    AuthModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
