"use strict";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Index } from "typeorm";
import { Crisis } from './crisis.model';  

@Entity()
export class Donation {
    @PrimaryGeneratedColumn()
    id: number;

    @Index() // Adding an index on donorName for faster lookup
    @Column({ nullable: true })
    donorName: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @CreateDateColumn()
    dateDonated: Date;

    @Column({ nullable: true })
    notes: string;

    @ManyToOne(() => Crisis, (crisis) => crisis.donations, { onDelete: 'SET NULL' })
    crisis: Crisis;
}