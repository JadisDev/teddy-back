import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  wage: number;

  @Column('decimal', { precision: 15, scale: 2 })
  company_value: number;

  @Column({ default: false })
  selected: boolean;
}
