"use strict";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index, OneToMany } from "typeorm";
import { User } from "./user.model";
import { Donation } from './donation.model';  

@Entity()
export class Crisis {
    @PrimaryGeneratedColumn()
    id: number;

    // Added index for faster searching of crisis by title
    @Index()
    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ type: 'varchar' })
    severity: string;

    @Column({ type: 'text', nullable: true })
    requiredHelp: string;

    // Added index for status
    @Index()
    @Column({ type: 'varchar', default: 'pending' })
    status: string;

    @CreateDateColumn()
    dateReported: Date;

    @ManyToOne(() => User, (user) => user.reportedCrises, { nullable: true })
    reportedByUser: User;

    @ManyToOne(() => User, (user) => user.approvedCrises, { nullable: true })
    approvedByAdmin: User;

    @OneToMany(() => Donation, (donation) => donation.crisis)
    donations: Donation[];

    @Column({ nullable: true })
    dateApproved: Date;

    
}
