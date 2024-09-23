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
exports.InventoryController = void 0;
const inventory_service_1 = require("../services/inventory.service");
class InventoryController {
    constructor() {
        // Get all inventory items
        this.getInventoryList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.inventoryService.getAllItems();
                return res.status(200).json({ message: 'Inventory items retrieved successfully', items });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
        // Create a new inventory item
        this.createItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const createItemDto = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(400).json({ message: 'User ID is required' });
                }
                const newItem = yield this.inventoryService.createItem(createItemDto, userId);
                return res.status(201).json({ message: 'Inventory item created successfully', item: newItem });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Update an inventory item
        this.updateItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const itemId = parseInt(req.params.id, 10);
                const updateDto = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(400).json({ message: 'User ID is required' });
                }
                const updatedItem = yield this.inventoryService.updateItem(itemId, updateDto, userId);
                return res.status(200).json({ message: 'Inventory item updated successfully', item: updatedItem });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Delete an inventory item
        this.deleteItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const itemId = parseInt(req.params.id, 10);
                yield this.inventoryService.deleteItem(itemId);
                return res.status(204).json({ message: 'Inventory item deleted successfully' });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        // Record a transaction
        this.recordTransaction = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const transactionDto = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(400).json({ message: 'User ID is required' });
                }
                const transaction = yield this.inventoryService.recordTransaction(transactionDto, userId);
                return res.status(201).json(transaction);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        this.inventoryService = new inventory_service_1.InventoryService();
    }
}
exports.InventoryController = InventoryController;
