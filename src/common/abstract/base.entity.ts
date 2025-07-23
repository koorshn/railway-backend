import { PrimaryGeneratedColumn } from 'typeorm';

export class IncrementalId {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
