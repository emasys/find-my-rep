import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ nullable: true })
  region: string;
}
