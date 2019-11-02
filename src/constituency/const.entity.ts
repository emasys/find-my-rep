import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Constituency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  stateId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
