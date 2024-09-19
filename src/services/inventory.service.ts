import { AppDataSource } from '../config/database.config';
import { InventoryItem } from '../models/inventoryItem.model';
import { InventoryTransaction } from '../models/inventoryTransaction.model';
import { CreateInventoryItemDto, UpdateInventoryItemDto } from '../dtos/inventoryItem.dto';
import { InventoryTransactionDto } from '../dtos/inventoryTransaction.dto';
import { Expense } from '../models/expense.model';
import { User } from '../models/user.model';

export class InventoryService {
  private itemRepository = AppDataSource.getRepository(InventoryItem);
  private transactionRepository = AppDataSource.getRepository(InventoryTransaction);
  private expenseRepository = AppDataSource.getRepository(Expense);

  // Get all inventory items
  async getAllItems(): Promise<InventoryItem[]> {
    return await this.itemRepository.find();
  }

  // Add a new inventory item
  async createItem(createItemDto: CreateInventoryItemDto, userId: number): Promise<InventoryItem> {
    const item = this.itemRepository.create({ ...createItemDto, createdBy: { id: userId } });
    return await this.itemRepository.save(item);
  }

  // Update an inventory item
  async updateItem(itemId: number, updateDto: UpdateInventoryItemDto, userId: number): Promise<InventoryItem> {
    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new Error('Item not found');
  
    Object.assign(item, updateDto);
  
    // Use Partial<User> to ensure TypeScript doesn't expect all User properties
    item.updatedBy = { id: userId } as User;
  
    return await this.itemRepository.save(item);
  }
  

  // Delete an inventory item
  async deleteItem(itemId: number): Promise<void> {
    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new Error('Item not found');

    await this.itemRepository.remove(item);
  }

  // Record a transaction and log the expense if it's a purchase
  async recordTransaction(transactionDto: InventoryTransactionDto, userId: number): Promise<InventoryTransaction> {
    const item = await this.itemRepository.findOne({ where: { id: transactionDto.itemId } });
    if (!item) throw new Error('Item not found');

    // Create the transaction
    const transaction = this.transactionRepository.create({
      ...transactionDto,
      item,
      user: { id: userId },
    });

    if (transactionDto.transactionType === 'purchase') {
      if (!transactionDto.cost) throw new Error('Cost is required for purchases');
      
      // Log the expense
      const expense = this.expenseRepository.create({
        amount: transactionDto.cost,
        item,
        user: { id: userId },
        notes: transactionDto.notes,
      });
      await this.expenseRepository.save(expense);

      // Update the item quantity when a purchase is made
      item.quantity += transactionDto.quantity;
      await this.itemRepository.save(item);
    }

    return await this.transactionRepository.save(transaction);
  }
}
