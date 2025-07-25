import { PrimaryGeneratedColumn } from 'typeorm';

export class UniqueIdEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
