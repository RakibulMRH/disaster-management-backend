// src/models/volunteerAssignment.model.ts
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { Assignment } from './assignment.model';

@Entity()
export class VolunteerAssignmentLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.assignments)
  user: User;

  @ManyToOne(() => Assignment, (assignment) => assignment.volunteerAssignments)
  assignment: Assignment;

  @CreateDateColumn()
  completedAt: Date;
  
  @CreateDateColumn()
  assignedAt: Date;

}
