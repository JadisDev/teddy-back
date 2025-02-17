import { Client } from 'src/client/models/client.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'teddyuser',
  password: process.env.DATABASE_PASSWORD || 'teddypassword',
  database: process.env.DATABASE_NAME || 'teddydb',
  entities: [Client],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
