"use strict";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Index } from 'typeorm';
import { InventoryTransaction } from './inventoryTransaction.model';
import { User } from './user.model';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Index()
  @Column({ type: 'varchar', length: 100 })
  type: string; // Relief or Expense

  @Column({ nullable: true })
  description: string;

  @Column()
  quantity: number;

  @OneToMany(() => InventoryTransaction, (transaction) => transaction.item)
  transactions: InventoryTransaction[];

  @ManyToOne(() => User)
  createdBy: User; // Track which admin or volunteer added this

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User; // Track last update user
}
