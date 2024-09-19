"use strict";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Index } from "typeorm";
import { User } from "./user.model";
import { InventoryItem } from "./inventoryItem.model";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InventoryItem, { nullable: true })
  item?: InventoryItem; // Optional, might not be linked to an inventory item

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;  // Amount spent

  @CreateDateColumn()
  @Index()  // Added index to date for faster range querying
  date: Date;

  @ManyToOne(() => User)
  user: User;  // The user who created the expense (admin or volunteer)

  @Column({ nullable: true })
  notes: string; // Additional details about the expense
}