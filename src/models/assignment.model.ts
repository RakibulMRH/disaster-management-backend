"use strict";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.model';
import { Crisis } from './crisis.model';
import { VolunteerAssignment } from './volunteerAssignment.model';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskDescription: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'varchar', default: 'assigned' })
  status: string;

  @Column({ type: 'int', default: 1 })  // Indicates how many volunteers are needed
  requiredVolunteers: number;

  @ManyToOne(() => User, (user) => user.assignedTasks, { onDelete: 'CASCADE' })
  assignedByAdmin: User;

  @ManyToOne(() => Crisis, (crisis) => crisis, { nullable: true, onDelete: 'SET NULL' })
  crisis: Crisis;

  // The relation that tracks which volunteers have been assigned or joined
  @OneToMany(() => VolunteerAssignment, (volunteerAssignment) => volunteerAssignment.assignment)
  volunteers: VolunteerAssignment[];
}
