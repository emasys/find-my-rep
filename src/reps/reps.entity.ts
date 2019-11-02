import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Reps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  names: string;

  @Column({ nullable: true })
  constituencyId: number;

  @Column()
  yearsInOffice: number;

  @Column()
  previousOffice: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
