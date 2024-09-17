// src/entities/inventoryTransaction.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
  import { InventoryItem } from './inventoryItem.entity';
  import { User } from './user.entity';
  
  @Entity()
  export class InventoryTransaction {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => InventoryItem, (item) => item.transactions, { onDelete: 'CASCADE' })
    item!: InventoryItem;
  
    @Column({ type: 'varchar' })
    transactionType!: 'donation' | 'purchase' | 'distribution';
  
    @Column()
    quantity!: number;
  
    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
    unitPrice?: number;
  
    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
    totalCost?: number;
  
    @CreateDateColumn()
    date!: Date;
  
    @ManyToOne(() => User, (user) => user.inventoryTransactions, { nullable: true })
    user?: User;
  
    @Column({ nullable: true })
    notes?: string;
  }
  