import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service';
import { CreateInventoryItemDto, UpdateInventoryItemDto } from '../dtos/inventoryItem.dto';
import { InventoryTransactionDto } from '../dtos/inventoryTransaction.dto';

export class InventoryController {
  private inventoryService: InventoryService;

  constructor() {
    this.inventoryService = new InventoryService();
  }

  // Get all inventory items
  getInventoryList = async (req: Request, res: Response) => {
    try {
      const items = await this.inventoryService.getAllItems();
      return res.status(200).json({ message: 'Inventory items retrieved successfully', items });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  // Create a new inventory item
  createItem = async (req: Request, res: Response) => {
    try {
      const createItemDto: CreateInventoryItemDto = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const newItem = await this.inventoryService.createItem(createItemDto, userId);
      return res.status(201).json({ message: 'Inventory item created successfully', item: newItem });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  // Update an inventory item
  updateItem = async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.id, 10);
      const updateDto: UpdateInventoryItemDto = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const updatedItem = await this.inventoryService.updateItem(itemId, updateDto, userId);
      return res.status(200).json({ message: 'Inventory item updated successfully', item: updatedItem });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  // Delete an inventory item
  deleteItem = async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.id, 10);
      await this.inventoryService.deleteItem(itemId);
      return res.status(204).json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  // Record a transaction
  recordTransaction = async (req: Request, res: Response) => {
    try {
      const transactionDto: InventoryTransactionDto = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const transaction = await this.inventoryService.recordTransaction(transactionDto, userId);
      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };
}
