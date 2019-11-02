import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { State } from '../state/state.entity';

@Entity()
export class Constituency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  stateId: number;

  @ManyToOne(type => State, state => state.constituency, {
    onDelete: 'SET NULL',
  })
  state: State[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
