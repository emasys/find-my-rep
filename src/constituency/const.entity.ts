import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { State } from '../state/state.entity';
import { Rep } from '../reps/reps.entity';

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

  @OneToOne(type => Rep, { onDelete: 'SET NULL' })
  rep: Rep;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
