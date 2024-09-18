// src/entities/donation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  donorName?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @CreateDateColumn()
  dateDonated!: Date;

  @Column({ nullable: true })
  notes?: string;
}
