"use strict";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { InventoryItem } from './inventoryItem.model';
import { User } from './user.model';

@Entity()
export class InventoryTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InventoryItem, (item) => item.transactions, { onDelete: 'CASCADE' })
  item: InventoryItem;

  @Column({ type: 'varchar' })
  transactionType: string; // 'add', 'remove', 'purchase'

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  cost?: number; // Cost is applicable for purchases

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User)
  user: User; // Track which user made the transaction

  @Column({ nullable: true })
  notes: string;
}
