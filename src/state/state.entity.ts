import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Constituency } from '../constituency/const.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  shortCode: string;

  @OneToMany(type => Constituency, constituency => constituency.state, {
    onDelete: 'SET NULL',
  })
  constituency: Constituency;

  @Column({ nullable: true })
  addedById: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
