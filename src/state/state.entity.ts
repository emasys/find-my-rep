import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortCode: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
