// src/entities/volunteerAssignment.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from './user.model';
  import { Crisis } from './crisis.model';
  
  @Entity()
  export class VolunteerAssignment {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => User, (user) => user.assignments, { onDelete: 'CASCADE' })
    volunteer!: User;
  
    @ManyToOne(() => Crisis, (crisis) => crisis, { nullable: true, onDelete: 'SET NULL' })
    crisis?: Crisis;
  
    @Column({ type: 'text', nullable: true })
    taskDescription?: string;
  
    @Column({ nullable: true })
    location?: string;
  
    @ManyToOne(() => User, (user) => user.assignedTasks, { onDelete: 'CASCADE' })
    assignedByAdmin!: User;
  
    @CreateDateColumn()
    dateAssigned!: Date;
  
    @Column({ type: 'varchar', default: 'assigned' })
    status!: 'assigned' | 'in_progress' | 'completed';
  }
  