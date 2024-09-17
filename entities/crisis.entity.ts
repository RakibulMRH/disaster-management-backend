// src/entities/crisis.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from './user.entity';
  
  @Entity()
  export class Crisis {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    title!: string;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @Column({ nullable: true })
    location?: string;
  
    @Column({ nullable: true })
    imageUrl?: string;
  
    @Column({ type: 'varchar' })
    severity!: 'low' | 'medium' | 'high' | 'critical';
  
    @Column({ type: 'text', nullable: true })
    requiredHelp?: string;
  
    @Column({ type: 'varchar', default: 'pending' })
    status!: 'pending' | 'approved' | 'resolved' | 'rejected';
  
    @CreateDateColumn()
    dateReported!: Date;
  
    @ManyToOne(() => User, (user) => user.reportedCrises, { nullable: true })
    reportedByUser?: User;
  
    @ManyToOne(() => User, (user) => user.approvedCrises, { nullable: true })
    approvedByAdmin?: User;
  
    @Column({ nullable: true })
    dateApproved?: Date;
  }
  