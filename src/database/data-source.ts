import { DataSource } from 'typeorm';
import { Client } from '../modules/client/entities/client.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST!,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  entities: [Client],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
