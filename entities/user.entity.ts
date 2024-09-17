// src/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { IsEmail } from 'class-validator';
import { VolunteerAssignment } from './volunteerAssignment.entity';
import { Crisis } from './crisis.entity';
import { InventoryTransaction } from './inventoryTransaction.entity';
import { Expense } from './expense.entity';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  @IsEmail()
  email?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ type: 'varchar' })
  role!: 'admin' | 'volunteer';

  @CreateDateColumn()
  dateJoined!: Date;

  @Column({ default: false })
  isVerified!: boolean;

  // Relations
  @OneToMany(() => VolunteerAssignment, (assignment) => assignment.volunteer)
  assignments!: VolunteerAssignment[]; // Removed = []

  @OneToMany(() => VolunteerAssignment, (assignment) => assignment.assignedByAdmin)
  assignedTasks!: VolunteerAssignment[];

  @OneToMany(() => Crisis, (crisis) => crisis.reportedByUser)
  reportedCrises!: Crisis[];

  @OneToMany(() => Crisis, (crisis) => crisis.approvedByAdmin)
  approvedCrises!: Crisis[];

  @OneToMany(() => InventoryTransaction, (transaction) => transaction.user)
  inventoryTransactions!: InventoryTransaction[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses!: Expense[];
}
