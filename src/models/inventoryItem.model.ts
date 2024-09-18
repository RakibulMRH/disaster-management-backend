// src/entities/inventoryItem.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InventoryTransaction } from './inventoryTransaction.model';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'varchar' })
  type!: 'Relief' | 'Expense';

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => InventoryTransaction, (transaction) => transaction.item)
  transactions!: InventoryTransaction[];
}
