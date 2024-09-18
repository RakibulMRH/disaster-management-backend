// src/entities/expense.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from './user.model';
  
  @Entity()
  export class Expense {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount!: number;
  
    @CreateDateColumn()
    date!: Date;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @ManyToOne(() => User, (user) => user.expenses, { nullable: true })
    user?: User;
  
    @Column({ nullable: true })
    notes?: string;
  }
  