"use strict";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

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
}