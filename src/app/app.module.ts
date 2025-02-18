import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ClientModule } from '../client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from 'src/seeds/seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST!,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      entities: [Client],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Client]),
    ConfigModule.forRoot(),
    AuthModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [SeedService],
})
export class AppModule {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seed();
  }
}
