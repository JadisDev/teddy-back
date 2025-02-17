import { Client } from "../models/client.entity";
import { CreateClientDto } from "../dto/create-user.dto";

export interface ClientServiceInterface {
  create(data: CreateClientDto): Promise<Client>;
  findAll(): Promise<Client[]>;
}