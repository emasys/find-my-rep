import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Constituency } from '../constituency/const.entity';

@Entity()
export class Rep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  names: string;

  @Column({ nullable: false, type: 'int' })
  constituencyId: number;

  @OneToOne(type => Constituency, { onDelete: 'SET NULL' })
  @JoinColumn()
  constituency: Constituency;

  @Column('int')
  yearsInOffice: number;

  @Column()
  previousOffice: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
