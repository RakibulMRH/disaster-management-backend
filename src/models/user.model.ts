"use strict";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Unique, Index } from "typeorm";
import { IsEmail } from "class-validator";
import { VolunteerAssignment } from "./volunteerAssignment.model";
import { Crisis } from "./crisis.model";
import { InventoryTransaction } from "./inventoryTransaction.model";
import { Expense } from "./expense.model";

@Entity()
@Unique(['username', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Added unique constraint to prevent duplicate usernames
    @Index({ unique: true })
    @Column()
    username: string;

    @Column()
    password: string;

    // Added index for email for faster queries
    @Index({ unique: true })
    @IsEmail()
    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    age: number;

    @Column({ type: 'varchar' })
    role: string;

    @CreateDateColumn()
    dateJoined: Date;

    @Column({ default: false })
    isVerified: boolean;

    @OneToMany(() => VolunteerAssignment, (assignment) => assignment.volunteer)
    assignments: VolunteerAssignment[];

    @OneToMany(() => VolunteerAssignment, (assignment) => assignment.assignedByAdmin)
    assignedTasks: VolunteerAssignment[];

    @OneToMany(() => Crisis, (crisis) => crisis.reportedByUser)
    reportedCrises: Crisis[];
  
    @OneToMany(() => Crisis, (crisis) => crisis.approvedByAdmin)
    approvedCrises: Crisis[];

    @OneToMany(() => InventoryTransaction, (transaction) => transaction.user)
    inventoryTransactions: InventoryTransaction[];

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses: Expense[];
}
