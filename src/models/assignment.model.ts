// src/models/assignment.model.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { VolunteerAssignmentLog } from './volunteerAssignmentLog.model';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  requiredVolunteers: number;

  @Column({ default: 0 })
  assignedVolunteers: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, default: 'recruiting' })  
  status: string; // 'active' | 'completed' | 'cancelled' | 'reqruiting'
 
  @OneToMany(() => VolunteerAssignmentLog, (volunteerAssignmentLog) => volunteerAssignmentLog.assignment)
  volunteerAssignments: VolunteerAssignmentLog[];
}
