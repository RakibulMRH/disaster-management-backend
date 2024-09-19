"use strict";
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from 'typeorm';
import { User } from './user.model';
import { Assignment } from './assignment.model';

@Entity()
export class VolunteerAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.assignments, { onDelete: 'CASCADE' })
  volunteer: User;

  @ManyToOne(() => Assignment, (assignment) => assignment.volunteers, { nullable: true, onDelete: 'SET NULL' })
  assignment: Assignment;

  @CreateDateColumn()
  dateAssigned: Date;

  @Column({ type: 'varchar', default: 'active' })
  status: string;
}
