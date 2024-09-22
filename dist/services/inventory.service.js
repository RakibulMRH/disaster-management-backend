"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const database_config_1 = require("../config/database.config");
const inventoryItem_model_1 = require("../models/inventoryItem.model");
const inventoryTransaction_model_1 = require("../models/inventoryTransaction.model");
const expense_model_1 = require("../models/expense.model");
class InventoryService {
    constructor() {
        this.itemRepository = database_config_1.AppDataSource.getRepository(inventoryItem_model_1.InventoryItem);
        this.transactionRepository = database_config_1.AppDataSource.getRepository(inventoryTransaction_model_1.InventoryTransaction);
        this.expenseRepository = database_config_1.AppDataSource.getRepository(expense_model_1.Expense);
    }
    // Get all inventory items
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.itemRepository.find();
        });
    }
    // Add a new inventory item
    createItem(createItemDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = this.itemRepository.create(Object.assign(Object.assign({}, createItemDto), { createdBy: { id: userId } }));
            return yield this.itemRepository.save(item);
        });
    }
    // Update an inventory item
    updateItem(itemId, updateDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.itemRepository.findOne({ where: { id: itemId } });
            if (!item)
                throw new Error('Item not found');
            Object.assign(item, updateDto);
            // Use Partial<User> to ensure TypeScript doesn't expect all User properties
            item.updatedBy = { id: userId };
            return yield this.itemRepository.save(item);
        });
    }
    // Delete an inventory item
    deleteItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.itemRepository.findOne({ where: { id: itemId } });
            if (!item)
                throw new Error('Item not found');
            yield this.itemRepository.remove(item);
        });
    }
    // Record a transaction and log the expense if it's a purchase
    recordTransaction(transactionDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.itemRepository.findOne({ where: { id: transactionDto.itemId } });
            if (!item)
                throw new Error('Item not found');
            // Create the transaction
            const transaction = this.transactionRepository.create(Object.assign(Object.assign({}, transactionDto), { item, user: { id: userId } }));
            if (transactionDto.transactionType === 'purchase') {
                if (!transactionDto.cost)
                    throw new Error('Cost is required for purchases');
                // Log the expense
                const expense = this.expenseRepository.create({
                    amount: transactionDto.cost,
                    item,
                    user: { id: userId },
                    notes: transactionDto.notes,
                });
                yield this.expenseRepository.save(expense);
                // Update the item quantity when a purchase is made
                item.quantity += transactionDto.quantity;
                yield this.itemRepository.save(item);
            }
            return yield this.transactionRepository.save(transaction);
        });
    }
}
exports.InventoryService = InventoryService;
