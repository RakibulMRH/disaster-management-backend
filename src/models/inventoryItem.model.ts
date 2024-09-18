"use strict";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from "typeorm";
import { InventoryTransaction } from "./inventoryTransaction.model";

@Entity()
export class InventoryItem {
    @PrimaryGeneratedColumn()
    id: number;

    // Added unique constraint to ensure no duplicate names
    @Column({ unique: true })
    name: string;

    // Added index on type for faster querying
    @Index()
    @Column({ type: 'varchar', length: 100 })
    type: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => InventoryTransaction, (transaction) => transaction.item)
    transactions: InventoryTransaction[];
}
